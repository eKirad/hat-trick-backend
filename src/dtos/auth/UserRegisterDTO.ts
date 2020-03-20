import IUserRegister from '../../interfaces/IUserRegisterDTO';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export default class UserRegisterDTO implements IUserRegister {
    @IsEmail()
    @IsNotEmpty()
    public eMail: string;

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
    public role?: "admin" | "default";
}