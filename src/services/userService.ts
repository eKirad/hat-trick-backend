import { UserDocument } from "./../models/user/user.types"
import UserModel from "../models/user/user.schema"
import { BaseService } from "./baseService"
import UserRepository from "../models/repositories/userRepository"
import { UserDTOs, UserResponse } from "../types/user/userUtilityTypes"
import { Document, Require_id } from "mongoose"

class UserService extends BaseService<UserDTOs, UserDocument, UserRepository> {
    constructor() {
        super(new UserRepository(UserModel))
        // Add service-specific constructor logic here
    }

    // modelToDTO = (model: Document<any, any, UserDocument>): UserResponse => {
    //     delete model.password

    // }
}

export default new UserService()
