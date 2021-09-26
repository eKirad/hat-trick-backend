
import UserModel from "../models/userModel";
import UserService from "../services/userService";
import { UserRegisterDTO, User } from "../types";
import { BaseController } from "./baseController";

class UserController extends BaseController<User, UserService> {
    constructor() { super(new UserService(), UserModel) }

    extractRequestBody = (requestBody: any): UserRegisterDTO => (
        { 
            email: requestBody.email, 
            password: requestBody.password, 
            firstName: requestBody.firstName, 
            lastName: requestBody.lastName 
        }
    );

}

export default new UserController()