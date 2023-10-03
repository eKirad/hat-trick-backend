import { Password } from "./../types/user/userPassword.type"
import UserModel from "../models/user/user.schema"
import * as jwt from "jsonwebtoken"
import { Config } from "../config/config"
import { UserRegisterDTO, UserLoginDTO } from "../types"
import { BaseService } from "./baseService"

import { createHttpErrorResponse, omitMongooseObjectProp } from "../utils"
import { UserResponse } from "../types"
import userService from "./userService"
import { TFunction } from "i18next"

import * as crypto from "crypto"
import { UserDocument } from "../models/user/user.types"
import { omitMultipleMongooseObjectProps } from "../utils/objectHandlers"
import * as bcrypt from "bcryptjs"
import { StatusCodes } from "http-status-codes"

export default class AuthService extends BaseService<any, any, any> {
    private static hashPassword = (plainPassword: string): string => bcrypt.hashSync(plainPassword)
    private static isPasswordValid = (plainPassword: string, passwordHash: string): boolean => bcrypt.compareSync(plainPassword, passwordHash)

    private static convertUserDTOToModel = (userDTO: UserLoginDTO, password: string) => ({
        ...userDTO,
        password,
        dateCreateAt: new Date(),
        lastUpdatedAt: new Date(),
    })

    private static convertUserModelToDTO = (userModel: UserDocument): UserResponse => {
        const propsToOmit = [`password`, `salt`]
        const userDTO = omitMultipleMongooseObjectProps<UserDocument, UserResponse>(userModel, propsToOmit)

        return userDTO
    }

    // TODO: Fix type
    private static assignJWT = (user: any): string =>
        jwt.sign(
            {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            new Config().authSecret,
            {
                expiresIn: process.env.TOKEN_VALIDITY || 60000 * 15,
            }
        )

    public static async signup(userDTO: UserRegisterDTO): Promise<UserResponse> {
        try {
            // const password = this.hashPassword(userDTO.password)
            const password = this.hashPassword(userDTO.password)
            const createUser = this.convertUserDTOToModel(userDTO, password)
            const userModel = await userService.createOne(createUser)
            const userResponse = this.convertUserModelToDTO(userModel)

            return userResponse
        } catch (error) {
            console.error(error)
        }
    }

    public static async login(userDTO: UserLoginDTO, t: TFunction): Promise<string> {
        try {
            const emailQuery = { email: userDTO.email }
            const serviceQueryOptions = { shouldConvertToDTO: false }
            const userModel = (await userService.findOne(emailQuery, t, serviceQueryOptions)) as any

            if (!this.isPasswordValid(userDTO.password, userModel.password)) throw Error("Password is not valid")

            const accessToken = AuthService.assignJWT(userModel)

            return accessToken
        } catch (error) {
            console.error(error)
        }
    }
}
