import UserModel from "../models/userModel"
import * as jwt from "jsonwebtoken"
import { Config } from "../config/config"
import { UserRegisterDTO, UserLoginDTO, User } from "../types"
import { BaseService } from "./baseService"
import * as bcrypt from "bcryptjs"

import { EnforceDocument } from "mongoose"
import { omitMongooseObjectProp } from "../utils"
import { UserResponse } from "../types"
export default class AuthService extends BaseService<any> {
    private static convertUserDTOToModel = (userDTO: UserLoginDTO) => ({
        ...userDTO,
        password: this.hashPassword(userDTO.password),
        dateCreateAt: new Date(),
        lastUpdatedAt: new Date(),
    })

    private static hashPassword = (plainPassword: string): string => bcrypt.hashSync(plainPassword)
    private static isPasswordValid = (plainPassword: string, passwordHash: string): boolean => bcrypt.compareSync(plainPassword, passwordHash)

    private static assignJWT = (user: EnforceDocument<User, {}>): string =>
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

    public static async signup(userDTO: UserRegisterDTO): Promise<EnforceDocument<UserResponse, {}>> {
        try {
            const createUser = this.convertUserDTOToModel(userDTO)
            const userModel = await UserModel.create(createUser)
            const userResponse = omitMongooseObjectProp<EnforceDocument<UserResponse, {}>>(userModel, `password`)

            return userResponse
        } catch (e) {
            console.error(e)
        }
    }

    public static async login(userDTO: UserLoginDTO): Promise<string> {
        try {
            const userModel = await UserModel.findOne({ email: userDTO.email }).exec()

            if (!userModel) {
                // TODO: Throw an error
            }

            if (!this.isPasswordValid(userDTO.password, userModel.password)) {
                // TODO: Throw an error
            }

            const accessToken = AuthService.assignJWT(userModel)

            return accessToken
        } catch (e) {
            console.error(e)
        }
    }
}
