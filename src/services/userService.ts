import { UserDocument } from "./../models/user/user.types"
import UserModel from "../models/user/user.schema"
import { BaseService } from "./baseService"
import UserRepository from "../models/repositories/userRepository"
import { UserDTOs, UserResponse } from "../types/user/userUtilityTypes"
import { Document, Require_id } from "mongoose"
import * as crypto from "crypto"

class UserService extends BaseService<UserDTOs, UserDocument, UserRepository> {
    constructor() {
        super(new UserRepository(UserModel))
    }

    modelToDTO = (model: UserDocument): UserResponse => {
        model.password = undefined
        model.salt = undefined

        return model.toObject()
    }

    private createPasswordSalt = (): Buffer => Buffer.from(crypto.randomBytes(16).toString("hex"))

    hashPassword = (plainTextPassword: string): string => {
        const salt = this.createPasswordSalt()

        return crypto.pbkdf2Sync(plainTextPassword, salt, 1000, 64, "sha1").toString("hex")
    }
}

export default new UserService()
