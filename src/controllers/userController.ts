import UserRepository from "../models/repositories/userRepository"
import { UserDocument } from "../models/user/userTypes"
import userService from "../services/userService"
import UserService from "../services/userService"
import { UserDTOs } from "../types/user/userUtility.types"
import { BaseController } from "./baseController"

class UserController extends BaseController<UserDTOs, UserDocument, UserRepository, typeof UserService> {
    constructor() {
        super(userService)
    }
}

export default new UserController()
