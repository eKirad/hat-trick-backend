
import UserService from "../services/userService";
import { User } from "../types/userType";
import { BaseController } from "./baseController";

export class UserController extends BaseController<User, UserService> {
    constructor() { super(new UserService()) }

    extractRequestBody = (requestBody: any): User => requestBody;

}