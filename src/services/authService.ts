import UserModel from "../models/user/user.schema"
import * as jwt from "jsonwebtoken"
import { Config } from "../config/config"
import { UserRegisterDTO, UserLoginDTO } from "../types"
import { BaseService } from "./baseService"

import { omitMongooseObjectProp } from "../utils"
import { UserResponse } from "../types"
import userService from "./userService"
import { TFunction } from "i18next"
import { Password } from "../types/user/userPassword.type"
import * as crypto from "crypto"

export default class AuthService extends BaseService<any, any, any> {
    private static createPasswordSalt = (): Buffer => Buffer.from(crypto.randomBytes(16).toString("hex"))

    private static isPasswordValid = (user: any, password: string): boolean => {
        const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha1").toString("hex")

        return user.password === hash
    }

    private static convertUserDTOToModel = (userDTO: UserLoginDTO, { hash, salt }: Password) => ({
        ...userDTO,
        hash,
        salt,
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
            const password = this.hashPassword(userDTO.password)
            const createUser = this.convertUserDTOToModel(userDTO, password)

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

    static hashPassword = (plainTextPassword: string): Password => {
        const salt = this.createPasswordSalt()
        const hash = crypto.pbkdf2Sync(plainTextPassword, salt, 1000, 64, "sha1").toString("hex")

        return { hash, salt }
    }
}
