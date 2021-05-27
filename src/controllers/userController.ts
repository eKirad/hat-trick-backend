
import UserService from "../services/userService";
import { User } from "../types";
import { BaseController } from "./baseController";

export class UserController extends BaseController<User, UserService> {
    constructor() { super(new UserService()) }

    extractRequestBody = (requestBody: any): Omit<User, "_id"> => (
        { 
            email: requestBody.email, 
            password: requestBody.pasword, 
            firstName: requestBody.firstName, 
            lastName: requestBody.lastName 
        }
    );

}