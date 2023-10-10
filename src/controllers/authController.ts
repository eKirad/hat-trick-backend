import { Response } from "express"
import AuthService from "../services/authService"
import { HttpResponse, UserResponse } from "../types"
import { createHttpResponse } from "../utils"
import { StatusCodes } from "http-status-codes"
import { HttpRequest } from "../types/httpTypes/httpRequest.type"
import HttpError from "../types/httpTypes/httpError.type"
import { TFunction } from "i18next"
import logger from "../config/logger/winstonLogger"
import { createHttpError } from "../utils/httpHandlers"

class AuthController {
    private extractError = (error: HttpError, { t }: Pick<HttpRequest<any>, "t">) => {
        const errorMessage = error.message || t("error:internal_server_error")
        const errorCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        logger.error(`Error ocurred at POST: auth/ with status ${errorCode}`)

        return { errorMessage, errorCode }
    }

    public signup = async ({ dto, t }: HttpRequest<any>, response: Response): Promise<HttpResponse<UserResponse>> => {
        try {
            const userModel = await AuthService.signup(dto, t)

            return createHttpResponse(response, StatusCodes.CREATED, userModel)
        } catch (error) {
            const { errorMessage, errorCode } = this.extractError(error, { t })
            throw createHttpError(errorCode, errorMessage)
        }
    }

    public login = async ({ dto, authSecret, t }: HttpRequest<any>, response: Response): Promise<HttpResponse<string>> => {
        try {
            const accessToken = await AuthService.login(dto, authSecret, t)

            return createHttpResponse(response, StatusCodes.OK, accessToken)
        } catch (error) {
            const { errorMessage, errorCode } = this.extractError(error, { t })
            throw createHttpError(errorCode, errorMessage)
        }
    }
}

export default new AuthController()
