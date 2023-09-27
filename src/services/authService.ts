import UserModel from "../models/user/user.schema"
import * as jwt from "jsonwebtoken"
import { Config } from "../config/config"
import { UserRegisterDTO, UserLoginDTO } from "../types"
import { BaseService } from "./baseService"
import * as bcrypt from "bcryptjs"

import { omitMongooseObjectProp } from "../utils"
import { UserResponse } from "../types"
import userService from "./userService"
import { TFunction } from "i18next"
import { UserDTOs } from "../types/user/userUtilityTypes"

export default class AuthService extends BaseService<any, any, any> {
    private static hashPassword = (plainPassword: string): string => bcrypt.hashSync(plainPassword)
    private static isPasswordValid = (plainPassword: string, passwordHash: string): boolean => bcrypt.compareSync(plainPassword, passwordHash)

    private static convertUserDTOToModel = (userDTO: UserLoginDTO, passwordHash: string) => ({
        ...userDTO,
        password: passwordHash,
        dateCreateAt: new Date(),
        lastUpdatedAt: new Date(),
    })

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
            const passwordHash = this.hashPassword(userDTO.password)
            const createUser = this.convertUserDTOToModel(userDTO, passwordHash)
            const userModel = await UserModel.create(createUser)
            const userResponse = omitMongooseObjectProp<UserResponse>(userModel, `password`)

            return userResponse
        } catch (e) {
            console.error(e)
        }
    }

    public static async login(userDTO: UserLoginDTO, t: TFunction): Promise<string> {
        try {
            const userModel = (await userService.findOne({ email: userDTO.email }, t)) as UserLoginDTO

            if (!this.isPasswordValid(userDTO.password, userModel.password)) {
                // TODO: Throw an error
            }

            const accessToken = AuthService.assignJWT(userModel)

            return accessToken
        } catch (error) {
            console.error(error)
        }
    }
}
