import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from '../../interfaces/TypeUserRole';
import IUserSignupDTO from "../../interfaces/IUserSignupDTO";

export default class UserSignupDTO implements IUserSignupDTO {
    
    @IsEmail()
    @IsNotEmpty()
    public eMail: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    public password: string;

    @IsString()
    @IsOptional()
    public firstName?: string;

    @IsString()
    @IsOptional()
    public lastName?: string;

    @IsOptional()
    @IsString()
    public role?: UserRole;
}