// DTO imports
import UserSignupDTO from "../dtos/auth/UserSignupDTO";
import UserLoginDTO from "../dtos/auth/UserLoginDTO";

// Enitity imports
import UserModel from "../models/user.model";

import IUserLoginResponse from "../api/types/IUserLoginResponse";
import IUserAPI from "../api/types/IUserAPI";
import * as jwt from 'jsonwebtoken';
import { Config } from "../config/Config";
import { User } from "../types/user.type";

export default class AuthService {

    
    public static async signup(user: User): Promise<User> {
        try {
            
            // const emailCounter = await UserModel.countDocuments({ eMail: userEntity.eMail});
            const userModel = await UserModel.create(user);

            // const userEntity = new UserEntity(userRegisterDTO);

            // const usernameCounter = await UserModel.countDocuments({ username: userEntity.username});
            
            // if (emailCounter > 0 || usernameCounter > 0) {
            //     // throw new HttpException(409, "User with email already exists", "ENTITY_ALREADY_EXISTS");
            //     console.log(`Entity already exits`);
            // }
    
            return user;
        } catch(e) {
            console.error(e);
        }
    }

    // public static async login(userLoginDTO: UserLoginDTO): Promise<IUserLoginResponse> {
    //     try {

    //         const userEntity = await UserModel
    //             .findOne({$or: [{ eMail: userLoginDTO.userIdentifier }, { username: userLoginDTO.userIdentifier }]});
        
    //         if (!userEntity) {
    //             console.log(`No user user with this email or username`);
    //         }
    
    //         if (!userEntity.isPasswodValid(userLoginDTO.password)) {
    //             console.log(`Wrong password`);
    //         }
    
    //         const userAPI = userEntity.classToAPI();
    //         const accessToken = AuthService.assignJWT(userAPI);

    //         return {
    //             accessToken,
    //             userAPI
    //         }
    //     } catch(e) {
    //         console.error(e);
    //     }
    // }

    public static assignJWT(userAPI: IUserAPI): string {
        return jwt.sign({
            id: userAPI.id,
            email: userAPI.email,
            username: userAPI.username,
            role: userAPI.role
        },
        new Config().authSecret, {
            expiresIn: `24h`
        });
    }

    
}