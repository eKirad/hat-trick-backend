import { Request, Response } from "express"
import AuthService from "../services/authService"
import { UserRegisterDTO, UserLoginDTO, HttpResponse, UserResponse } from "../types"
import { createHttpErrorResponse, createHttpResponse } from "../utils"
import { StatusCodes } from "http-status-codes"
import { HttpRequest } from "../types/httpTypes/httpRequestType"
import HttpError from "../types/httpTypes/httpError"
import { TFunction } from "i18next"
import logger from "../config/logger"

class AuthController {
    private extractLoginData = (requestBody: any): UserLoginDTO => ({ email: requestBody.email, password: requestBody.password })
    private extractSignupData = (requestBody: any): UserRegisterDTO => ({
        email: requestBody.email,
        password: requestBody.password,
        firstName: requestBody.firstName,
        lastName: requestBody.lastName,
    })

    private extractError = (error: HttpError, t: TFunction) => {
        const errorMessage = error.message || t("error:internal_server_error")
        const errorCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        logger.error(`Error ocurred at POST: auth/ with status ${errorCode}`)

        return { errorMessage, errorCode }
    }

    public signup = async ({ dto, t }: HttpRequest<any>, response: Response): Promise<HttpResponse<UserResponse>> => {
        try {
            const userDto = this.extractSignupData(dto)
            const userModel = await AuthService.signup(userDto, t)

            return createHttpResponse(response, StatusCodes.CREATED, userModel)
        } catch (error) {
            const { errorMessage, errorCode } = this.extractError(error, t)
            throw createHttpErrorResponse(response, errorCode, errorMessage)
        }
    }

    public login = async ({ body, t }: Request, response: Response): Promise<HttpResponse<string>> => {
        try {
            const userDto = this.extractLoginData(body)
            const accessToken = await AuthService.login(userDto, t)

            return createHttpResponse(response, StatusCodes.OK, accessToken)
        } catch (error) {
            console.error(error)
        }
    }
}

export default new AuthController()
