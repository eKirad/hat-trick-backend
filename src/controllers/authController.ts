import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import { Router, Request, Response, NextFunction } from 'express';
import UserSignupDTO from '../dtos/auth/UserSignupDTO';
import { plainToClass } from "class-transformer";
import AuthService from '../services/authService';
import UserLoginDTO from '../dtos/auth/UserLoginDTO';
import { User } from '../types/user.type';

export default class AuthController {
    public path = `/auth`;
    public router = express.Router();
    
    private extractLoginData = (requestBody: any): Pick<User, "email" | "password"> => ({ email: requestBody.email, password: requestBody.password })
    private extractData = (requestBody: any): User => ({ email: requestBody.email, firstName: requestBody.firstName, lastName: requestBody.lastName, password: requestBody.password })

    constructor () { 
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(`/signup`, this.signup);
        this.router.post(`/login`, this.login);
    }

    protected signup = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user = this.extractData(request.body);
            await AuthService.signup(user)
            response.status(201).send({ msg: "Signup successfull" });
        } catch (e) {
            next(e);
        }
    }

    protected login = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user = this.extractLoginData(request.body)
            const loginResponse = await AuthService.login(user);
            response.status(200).send(loginResponse);
        } catch (e) {
            next(e);
        }
    }
}