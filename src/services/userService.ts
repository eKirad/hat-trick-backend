import { UserDocument } from "./../models/user/user.types"
import UserModel from "../models/user/user.schema"
import { BaseService } from "./baseService"
import UserRepository from "../models/repositories/userRepository"
import { UserDTOs, UserResponse } from "../types/user/userUtilityTypes"
import { omitMultipleMongooseObjectProps } from "../utils/objectHandlers"

class UserService extends BaseService<UserDTOs, UserDocument, UserRepository> {
    constructor() {
        super(new UserRepository(UserModel))
    }

    modelToDTO = (model: UserDocument): UserResponse => {
        const propsToOmit = [`password`, `salt`]
        const userDTO = omitMultipleMongooseObjectProps<UserDocument, UserResponse>(model, propsToOmit)

        return userDTO
    }
}

export default new UserService()
