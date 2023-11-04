import { LeagueDocument } from "../leagues/leagueTypes"
import { BaseRepository } from "./baseRepository"
import { Model as MongooseModel } from "mongoose"

export default class LeagueRepository extends BaseRepository<any, LeagueDocument> {
    constructor(model: MongooseModel<LeagueDocument>) {
        super(model)
    }
}
