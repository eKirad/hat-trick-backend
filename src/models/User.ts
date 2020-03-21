
import {prop, getModelForClass, mongoose, Typegoose} from '@typegoose/typegoose';
import { UserRole } from '../interfaces/TypeUserRole';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from "bcryptjs";

import IUserAPI from '../api/types/IUserAPI';
import IUserSignupDTO from '../interfaces/IUserSignupDTO';

export class UserEntity {
    
    @prop({ required: true })
    public id: string;

    @prop({ required: true, unique: true })
    public username: string;

    @prop({ required: true, unique: true })
    public eMail: string;

    @prop()
    public firstName: string;
    
    @prop()
    public lastName: string;

    @prop()
    public role: UserRole;

    @prop()
    public createdAt: Date;


    @prop()
    public updatedAt: Date;

    @prop()
    private hashedPassword: string;

    constructor(userSignupDTO: IUserSignupDTO, id?: string) {
        this.id = id ? id : uuidv4();
        this.username = userSignupDTO.username;
        this.eMail = userSignupDTO.eMail;
        this.firstName = userSignupDTO.firstName;
        this.lastName = userSignupDTO.lastName;
        this.role = userSignupDTO.role;
        this.hashPassword(userSignupDTO.password);

    }

    public hashPassword(password: string): void {
        this.hashedPassword = bcrypt.hashSync(password);
    }

    public isPasswodValid(password: string): boolean {
        return bcrypt.compareSync(password, this.hashedPassword);
    }

    public classToAPI(): IUserAPI {
        return {
            id: this.id,
            username: this.username,
            email: this.eMail,
            role: this.role,
            firstName: this.firstName,
            lastName: this.lastName
        }
    }
}

export const UserModel = getModelForClass(UserEntity);