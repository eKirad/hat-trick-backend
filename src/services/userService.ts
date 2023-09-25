import UserModel from "../models/userModel"
import { User, UserResponse } from "../types"
import { BaseService } from "./baseService"
import { EnforceDocument } from "mongoose"
import { TFunction } from "i18next"
import HttpError from "../types/httpTypes/httpError"
import { StatusCodes } from "http-status-codes"
import { getMongooseCollectionDisplayName, omitMongooseObjectProp } from "../utils"
import UserRepository from "../models/repositories/userRepository"

class UserService extends BaseService<User, UserRepository> {
    constructor() {
        super(new UserRepository(UserModel))
        // Add service-specific constructor logic here
    }
}

export default new UserService()
