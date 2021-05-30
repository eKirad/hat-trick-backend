// Enitity imports
import UserModel from "../models/userModel";
import * as jwt from 'jsonwebtoken';
import { Config } from "../config/config";
import { OmitUserProps, User } from "../types/userType";
import { BaseService } from "./baseService";
import * as bcrypt from 'bcryptjs';
import { EnforceDocument } from "mongoose";

export default class AuthService extends BaseService<any> {

    public static async signup(userDTO: Omit<User, OmitUserProps>): Promise<EnforceDocument<User, {}>> {
        console.log(userDTO)
        
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

    public static async login(loginUser: Pick<User, "email" | "password">): Promise<any> {
        try {

            // const userModel = await UserModel.findOne({$or: [{ eMail: userLoginDTO.userIdentifier }, { username: userLoginDTO.userIdentifier }]});
            
            const userModel = await UserModel.findOne();
        
            // if (!userEntity) {
            //     console.log(`No user user with this email or username`);
            // }
    
            // if (!userEntity.isPasswodValid(userLoginDTO.password)) {
            //     console.log(`Wrong password`);
            // }
    
            // const userAPI = userEntity.classToAPI();
            const accessToken = AuthService.assignJWT(userModel);

            return {
                accessToken,
                userModel
            }

        } catch(e) {
            console.error(e);
        }
    }

    private static hashPassword = (plainPassword: string): string => bcrypt.hashSync(plainPassword);

    public static assignJWT(user: User): string {
        return jwt.sign({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        },
        new Config().authSecret, {
            expiresIn: `24h`
        });
    }

    
}