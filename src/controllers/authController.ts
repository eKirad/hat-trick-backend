import { Request, Response, NextFunction } from "express"
import AuthService from "../services/authService"
import { UserRegisterDTO, UserLoginDTO, User, HttpResponse, UserResponse } from "../types"
import { createHttpResponse } from "../utils"
import { StatusCodes } from "http-status-codes"

class AuthController {
    private extractLoginData = (requestBody: any): UserLoginDTO => ({ email: requestBody.email, password: requestBody.password })
    private extractSignupData = (requestBody: any): UserRegisterDTO => ({
        email: requestBody.email,
        password: requestBody.password,
        firstName: requestBody.firstName,
        lastName: requestBody.lastName,
    })

    public signup = async (request: Request, response: Response, next: NextFunction): Promise<HttpResponse<UserResponse>> => {
        try {
            const userDto = this.extractSignupData(request.body)
            const userModel = await AuthService.signup(userDto)

            return createHttpResponse(response, StatusCodes.CREATED, userModel)
        } catch (e) {
            next(e)
        }
    }

    public login = async (request: Request, response: Response, next: NextFunction): Promise<HttpResponse<string>> => {
        try {
            const userDto = this.extractLoginData(request.body)
            const accessToken = await AuthService.login(userDto)

            return createHttpResponse(response, StatusCodes.OK, accessToken)
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController()
