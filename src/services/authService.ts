// Enitity imports
import UserModel from "../models/userModel";
import * as jwt from 'jsonwebtoken';
import { Config } from "../config/config";
import { OmitUserProps, PickUserLoginProps, User } from "../types";
import { BaseService } from "./baseService";
import * as bcrypt from 'bcryptjs';
import { EnforceDocument } from "mongoose";

export default class AuthService extends BaseService<any> {

    private static hashPassword = (plainPassword: string): string => bcrypt.hashSync(plainPassword);
    private static isPasswordValid = (plainPassword: string, passwordHash: string): boolean => bcrypt.compareSync(plainPassword, passwordHash)
    
    public static async signup(userDTO: Omit<User, OmitUserProps>): Promise<EnforceDocument<User, {}>> {
        
        try {
            const createUser = {
                ...userDTO,
                password: this.hashPassword(userDTO.password),
                dateCreateAt: new Date(),
                lastUpdatedAt: new Date()
            }
            const userModel = await UserModel.create(createUser);
            return userModel;
        } catch(e) {
            console.error(e);
        }
    }

    public static async login(userDTO: Pick<User, PickUserLoginProps>): Promise<string> {
        try {

            // const userModel = await UserModel.findOne({$or: [{ eMail: userLoginDTO.userIdentifier }, { username: userLoginDTO.userIdentifier }]});
            
            const userModel = await UserModel.findOne({ email: userDTO.email }).exec();
            
            if (!userModel) {
                // TODO: Throw an error
            }

            if (!this.isPasswordValid(userDTO.password, userModel.password)) {
                // TODO: Throw an error
            }

            return AuthService.assignJWT(userModel);
        } catch(e) {
            console.error(e);
        }
    }

    public static assignJWT = (user:  EnforceDocument<User, {}>): string => jwt.sign(
        {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        },
        new Config().authSecret, {
            expiresIn: process.env.TOKEN_VALIDITY
        }
    );
}