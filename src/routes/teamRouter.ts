import * as express from "express"
import { TEAM_PATH } from "./consts"
import { requestWrapper } from "./requestWrapper"
import TeamController from "../controllers/teamController"
import { authMiddleware } from "../middlewares"

const router = express.Router()
const path = TEAM_PATH

router.get(`/${path}`, authMiddleware, requestWrapper(TeamController.getAll)).get(`/${path}/:id`, authMiddleware, requestWrapper(TeamController.getOne))

export default router