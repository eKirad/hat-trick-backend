import { TeamDocument } from "../teams/teamTypes"
import { BaseRepository } from "./baseRepository"
import { Model as MongooseModel } from "mongoose"

export default class TeamRepository extends BaseRepository<any, TeamDocument> {
    constructor(model: MongooseModel<TeamDocument>) {
        super(model)
    }
}
