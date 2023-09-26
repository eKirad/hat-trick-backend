import { User } from "../../types"
import { BaseRepository } from "./baseRepository"
import { Model as MongooseModel } from "mongoose"

export default class UserRepository extends BaseRepository<User> {
    constructor(model: MongooseModel<User>) {
        super(model)
    }
}
