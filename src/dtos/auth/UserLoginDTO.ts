import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from '../../interfaces/TypeUserRole';
import IUserSignupDTO from "../../interfaces/IUserSignupDTO";
import IUserLoginDTO from "../../interfaces/IUserLoginDTO";

export default class UserLoginDTO implements IUserLoginDTO {
    
    @IsNotEmpty()
    public userIdentifier: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    public password: string;
}