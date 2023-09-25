import UserModel from "../models/userModel"
import { User, UserResponse } from "../types"
import { BaseService } from "./baseService"
import { EnforceDocument } from "mongoose"
import { TFunction } from "i18next"
import HttpError from "../types/httpTypes/httpError"
import { StatusCodes } from "http-status-codes"
import { getMongooseCollectionDisplayName, omitMongooseObjectProp } from "../utils"
import { userRepository } from "../models/repositories/user.repository"
import { defaultRepositoryOptions } from "../models/repositories/base.repository"

export default class UserService extends BaseService<User> {
    public constructor() {
        super(UserModel)
    }

    findOneById = async (id: string, t: TFunction): Promise<EnforceDocument<typeof UserModel, {}>> => {
        const userModel = await userRepository.findById(id, defaultRepositoryOptions)
        if (!userModel) throw new HttpError(StatusCodes.NOT_FOUND, t("error:not_found", { collection: getMongooseCollectionDisplayName(UserModel.collection.name) }))
        const userResponse = omitMongooseObjectProp<EnforceDocument<UserResponse, {}>>(userModel, `password`)

        return userResponse
    }
}
