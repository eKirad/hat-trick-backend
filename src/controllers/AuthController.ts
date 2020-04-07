import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import { Router, Request, Response, NextFunction } from 'express';
import UserSignupDTO from '../dtos/auth/UserSignupDTO';
import { plainToClass } from "class-transformer";
import AuthService from '../services/AuthService';
import UserLoginDTO from '../dtos/auth/UserLoginDTO';

export default class AuthController {
    public path = "/auth";
    public router = express.Router();
    
    constructor () { 
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post("/signup", this.signup);
        this.router.post("/login", this.login);
    }

    protected signup = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userSignupDTO: UserSignupDTO = plainToClass(UserSignupDTO, request.body);
            await AuthService.signup(userSignupDTO)
            response.status(201).send({ msg: "Signup successfull" });
        } catch (e) {
            next(e);
        }
    }

    protected login = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userLoginDTO: UserLoginDTO = plainToClass(UserLoginDTO, request.body);
            const loginResponse = await AuthService.login(userLoginDTO);
            response.status(200).send(loginResponse);
        } catch (e) {
            next(e);
        }
    }
}