import { Request, Response, NextFunction } from "express"
import AuthService from "../services/authService"
import { UserRegisterDTO, UserLoginDTO, HttpResponse, UserResponse } from "../types"
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

    public signup = async (request: Request, response: Response): Promise<HttpResponse<UserResponse>> => {
        try {
            const userDto = this.extractSignupData(request.body)
            const userModel = await AuthService.signup(userDto)

            return createHttpResponse(response, StatusCodes.CREATED, userModel)
        } catch (error) {
            console.error(error)
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
