import { UserDTOs } from "./../../types/user/userUtilityTypes"
import { UserDocument } from "../user/user.types"
import { BaseRepository } from "./baseRepository"
import { Model as MongooseModel } from "mongoose"

export default class UserRepository extends BaseRepository<UserDTOs, UserDocument> {
    constructor(model: MongooseModel<UserDocument>) {
        super(model)
    }
}
