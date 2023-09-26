import UserRepository from "../models/repositories/userRepository"
import UserModel from "../models/userModel"
import userService from "../services/userService"
import UserService from "../services/userService"
import { User } from "../types"
import { BaseController } from "./baseController"

class UserController extends BaseController<User, UserRepository, typeof UserService> {
    constructor() {
        super(userService, UserModel)
    }
}

export default new UserController()
