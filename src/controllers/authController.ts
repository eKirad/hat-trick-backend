import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/authService';
import { User } from '../types/userType';

export default class AuthController {
    private extractLoginData = (requestBody: any): Pick<User, "email" | "password"> => ({ email: requestBody.email, password: requestBody.password })
    private extractData = (requestBody: any): User => ({ email: requestBody.email, firstName: requestBody.firstName, lastName: requestBody.lastName, password: requestBody.password })

    public signup = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user = this.extractData(request.body);
            await AuthService.signup(user)
            response.status(201).send({ msg: "Signup successfull" });
        } catch (e) {
            next(e);
        }
    }

    // TODO: Remove after base controller integration
    public test = (req, res, next) => {
        res.end(JSON.stringify({ test: "Test" }));
    }

    public login = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user = this.extractLoginData(request.body)
            const loginResponse = await AuthService.login(user);
            response.status(200).send(loginResponse);
        } catch (e) {
            next(e);
        }
    }
}