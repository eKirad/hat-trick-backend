import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import {prop, getModelForClass, mongoose, Typegoose} from '@typegoose/typegoose';
import { UserRole } from '../interfaces/TypeUserRole';
import uuid from "uuid";

import IUserRegister from '../interfaces/IUserRegisterDTO';
import IUserAPI from '../api/IUserAPI';

export class UserEntity extends Typegoose {
    
    @prop()
    public id: string;

    @prop()
    public username: string;

    @prop()
    public firstName: string;
    
    @prop()
    public lastName: string;

    @prop()
    public eMail: string;
    
    @prop()
    public role: UserRole;

    @prop()
    public createdAt: Date;


    @prop()
    public updatedAt: Date;

    @prop()
    private passwordHash: string;

    constructor(userRegister: IUserRegister, id?: string) {
        super();
        this.id = id ? id : uuid.v4();
        this.username = userRegister.username;
        this.eMail = userRegister.eMail;
        this.firstName = userRegister.firstName;
        this.lastName = userRegister.lastName;
        this.role = userRegister.role;

    }

    public hasshPassword(password: string): void {

    }

    public isPasswodValid(password: string): boolean {
        return true;
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