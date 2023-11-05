import { TEAM_PATH } from "./consts"
import TeamController from "../controllers/teamController"
import { generateBaseGETRoutesOnly } from "./baseRouter"

const path = TEAM_PATH

const router = generateBaseGETRoutesOnly(path, TeamController)

export default router
