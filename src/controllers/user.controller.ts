import UserRepository from "../models/repositories/user.repository"
import UserModel from "../models/user/user.schema"
import { UserDocument } from "../models/user/user.types"
import userService from "../services/userService"
import UserService from "../services/userService"
import { UserDTOs } from "../types/user/userUtility.types"
import { BaseController } from "./base.controller"

class UserController extends BaseController<UserDTOs, UserDocument, UserRepository, typeof UserService> {
    constructor() {
        super(userService)
    }
}

export default new UserController()
