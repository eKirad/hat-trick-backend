import { LEAGUE_PATH } from "./consts"
import LeagueController from "../controllers/leagueController"
import { generateBaseGETRoutesOnly } from "./baseRouter"

const path = LEAGUE_PATH

const router = generateBaseGETRoutesOnly(path, LeagueController)

export default router
