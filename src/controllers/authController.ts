import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/authService';
import { OmitUserProps, PickUserLoginProps, User } from '../types';
import { httpResponse } from '../utils';
import { StatusCodes } from 'http-status-codes';
import { HttpResponse } from '../types/httpResponseType';


export default class AuthController {

    private extractLoginData = (requestBody: any): Pick<User, PickUserLoginProps> => ({ email: requestBody.email, password: requestBody.password });
    private extractRequestBody = (requestBody: any): Omit<User, OmitUserProps> => (
        { 
            email: requestBody.email, 
            password: requestBody.password, 
            firstName: requestBody.firstName, 
            lastName: requestBody.lastName, 
        }
    );

    public signup = async (request: Request, response: Response, next: NextFunction): Promise<HttpResponse<User>> => {
        try {
            const userDto = this.extractRequestBody(request.body);
            const userModel = await AuthService.signup(userDto)
            return httpResponse(response, StatusCodes.OK, userModel);
        } catch (e) {
            next(e);
        }
    }

    public login = async (request: Request, response: Response, next: NextFunction): Promise<HttpResponse<string>> => {
        try {
            const user = this.extractLoginData(request.body)
            const loginResponse = await AuthService.login(user);
            return httpResponse(response, StatusCodes.OK, loginResponse);
        } catch (e) {
            next(e);
        }
    }
}