import UserRepository from "../models/repositories/userRepository"
import UserModel from "../models/userModel"
import userService from "../services/userService"
import UserService from "../services/userService"
import { UserRegisterDTO, User } from "../types"
import { BaseController } from "./baseController"

class UserController extends BaseController<User, UserRepository, typeof UserService> {
    constructor() {
        super(userService, UserModel)
    }

    extractRequestBody = (requestBody: any): UserRegisterDTO => ({
        email: requestBody.email,
        password: requestBody.password,
        firstName: requestBody.firstName,
        lastName: requestBody.lastName,
    })
}

export default new UserController()
