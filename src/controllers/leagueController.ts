import LeagueService from "../services/leagueService"
import { BaseController } from "./baseController"
import { LeagueDocument } from "../models/leagues/leagueTypes"
import LeagueRepository from "../models/repositories/leagueRepository"
import leagueService from "../services/leagueService"

class LeagueController extends BaseController<any, LeagueDocument, LeagueRepository, typeof LeagueService> {
    constructor() {
        super(leagueService)
    }
}

export default new LeagueController()
