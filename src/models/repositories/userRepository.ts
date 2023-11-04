import { UserDTOs } from "../../types/user/userUtility.types"
import { UserDocument } from "../user/userTypes"
import { BaseRepository } from "./baseRepository"
import { Model as MongooseModel } from "mongoose"

export default class UserRepository extends BaseRepository<UserDTOs, UserDocument> {
    constructor(model: MongooseModel<UserDocument>) {
        super(model)
    }
}
