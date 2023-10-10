import { UserDTOs } from "../../types/user/userUtility.types"
import { UserDocument } from "../user/user.types"
import { BaseRepository } from "./base.repository"
import { Model as MongooseModel } from "mongoose"

export default class UserRepository extends BaseRepository<UserDTOs, UserDocument> {
    constructor(model: MongooseModel<UserDocument>) {
        super(model)
    }
}
