// DTO imports
import UserSignupDTO from "../dtos/auth/UserSignupDTO";

// Enitity imports
import { UserEntity, UserModel } from "../models/User";


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
}