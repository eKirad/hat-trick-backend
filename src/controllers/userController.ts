
import UserService from "../services/userService";
import { OmitUserProps, User } from "../types";
import { BaseController } from "./baseController";

export class UserController extends BaseController<User, UserService> {
    constructor() { super(new UserService()) }

    extractRequestBody = (requestBody: any): Omit<User, OmitUserProps> => (
        { 
            email: requestBody.email, 
            password: requestBody.pasword, 
            firstName: requestBody.firstName, 
            lastName: requestBody.lastName 
        }
    );

}