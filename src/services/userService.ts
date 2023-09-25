import UserModel from "../models/userModel"
import { User } from "../types"
import { BaseService } from "./baseService"
import UserRepository from "../models/repositories/userRepository"

class UserService extends BaseService<User, UserRepository> {
    constructor() {
        super(new UserRepository(UserModel))
        // Add service-specific constructor logic here
    }
}

export default new UserService()
