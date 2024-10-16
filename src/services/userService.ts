import { UserDocument } from "../models/user/userTypes"
import UserModel from "../models/user/userSchema"
import { BaseService } from "./baseService"
import UserRepository from "../models/repositories/userRepository"
import { UserDTOs, UserResponse } from "../types/user/userUtility.types"
import { omitMultipleMongooseObjectProps } from "../utils/objectHandlers"

class UserService extends BaseService<UserDTOs, UserDocument, UserRepository> {
    constructor() {
        super(new UserRepository(UserModel), UserModel)
    }

    modelToDTO = (model: UserDocument): UserResponse => {
        const propsToOmit = [`password`, `salt`]
        const userDTO = omitMultipleMongooseObjectProps<UserDocument, UserResponse>(model, propsToOmit)

        return userDTO
    }

    modelsToDTOs = (models: UserDocument[]): UserResponse[] => {
        const propsToOmit = [`password`, `salt`]
        const userDTOs = models.map((model: UserDocument) => omitMultipleMongooseObjectProps<UserDocument, UserResponse>(model, propsToOmit))

        return userDTOs
    }
}

export default new UserService()
