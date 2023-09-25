import { User } from "../../types"
import { BaseRepository } from "./baseRepository"
import { Model as MongooseModel, EnforceDocument } from "mongoose"

export default class UserRepository extends BaseRepository<User> {
    constructor(model: MongooseModel<User>) {
        super(model)
    }
}
