import TeamRepository from "../models/repositories/teamRepository"
import { TeamDocument } from "../models/teams/teamTypes"
import TeamService from "../services/teamService"
import { BaseController } from "./baseController"
import teamService from "../services/teamService"

class TeamController extends BaseController<any, TeamDocument, TeamRepository, typeof TeamService> {
    constructor() {
        super(teamService)
    }
}

export default new TeamController()
