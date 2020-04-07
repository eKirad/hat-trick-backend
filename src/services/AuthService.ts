// DTO imports
import UserSignupDTO from "../dtos/auth/UserSignupDTO";
import UserLoginDTO from "../dtos/auth/UserLoginDTO";

// Enitity imports
import { UserEntity, UserModel } from "../models/User";

import IUserLoginResponse from "../api/types/IUserLoginResponse";
import IUserAPI from "../api/types/IUserAPI";
import * as jwt from 'jsonwebtoken';
import { Config } from "../config/Config";

export default class AuthService {
    
    public static async signup(userRegisterDTO: UserSignupDTO): Promise<UserEntity> {
        const userEntity = new UserEntity(userRegisterDTO);
        
        const emailCunter = await UserModel.countDocuments({ eMail: userEntity.eMail});
        const usernameCunter = await UserModel.countDocuments({ username: userEntity.username});
        
        if (emailCunter > 0 || usernameCunter > 0) {
            // throw new HttpException(409, "User with email already exists", "ENTITY_ALREADY_EXISTS");
            console.log(`Entity already exits`);
        }

        const user = await UserModel.create(userEntity);
        return user;
    }


    public static async login(userLoginDTO: UserLoginDTO): Promise<IUserLoginResponse> {
        const userEntity = await UserModel.findOne({$or: [{ eMail: userLoginDTO.userIdentifier }, { username: userLoginDTO.userIdentifier }]});
        
        if (!userEntity) {
            console.log(`No user user with this email or username`);
        }

        if (!userEntity.isPasswodValid(userLoginDTO.password)) {
            console.log(`Wrong password`);
        }

        const userAPI = userEntity.classToAPI();
        const accessToken = AuthService.assignJWT(userAPI);

        return {
            accessToken,
            userAPI
        }
    }

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