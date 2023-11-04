import * as jwt from "jsonwebtoken"
import { UserRegisterDTO, UserLoginDTO } from "../types"
import { BaseService } from "./baseService"
import { UserResponse } from "../types"
import userService from "./userService"
import { TFunction } from "i18next"
import { UserDocument } from "../models/user/userTypes"
import { omitMultipleMongooseObjectProps } from "../utils/objectHandlers"
import * as bcrypt from "bcryptjs"
import { StatusCodes } from "http-status-codes"
import HttpError from "../types/httpTypes/httpError.type"
export default class AuthService extends BaseService<any, any, any> {
    private static hashPassword = (plainPassword: string): string => bcrypt.hashSync(plainPassword)
    private static isInvalidPassword = (plainPassword: string, passwordHash: string): boolean => !bcrypt.compareSync(plainPassword, passwordHash)

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
    private static assignJWT = (user: any, authSecret: string): string =>
        jwt.sign(
            {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            authSecret,
            {
                expiresIn: process.env.TOKEN_VALIDITY || 60000 * 15,
            }
        )

    private static throwError = (error: any, t: TFunction) => {
        const errorCode = error?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        const errorMessage = error?.message || t("error:internal_server_error")
        throw new HttpError(errorCode, errorMessage)
    }

    public static async signup(userDTO: UserRegisterDTO, t: TFunction): Promise<UserResponse> {
        try {
            const password = this.hashPassword(userDTO.password)
            const createUser = this.convertUserDTOToModel(userDTO, password)
            const userModel = await userService.createOne(createUser)
            const userResponse = this.convertUserModelToDTO(userModel)

            return userResponse
        } catch (error) {
            const errorCode = error?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
            throw new HttpError(errorCode, t("error:internal_server_error"))
        }
    }

    public static async login(userDTO: UserLoginDTO, authSecret: string, t: TFunction): Promise<string> {
        try {
            const emailQuery = { email: userDTO.email }
            const serviceQueryOptions = { shouldConvertToDTO: false }
            const userModel = (await userService.findOne(emailQuery, t, serviceQueryOptions)) as any

            if (this.isInvalidPassword(userDTO.password, userModel.password)) throw new HttpError(StatusCodes.UNAUTHORIZED, t("error:unauthorized"))

            const accessToken = AuthService.assignJWT(userModel, authSecret)

            return accessToken
        } catch (error) {
            AuthService.throwError(error, t)
        }
    }
}
