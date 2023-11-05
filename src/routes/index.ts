import * as express from "express"
import authRouter from "./authRouter"
import userRouter from "./userRouter"
import teamRouter from "./teamRouter"
import leagueRouter from "./leagueRouter"

const router = express.Router()

export default router.use([authRouter, userRouter, leagueRouter, teamRouter])
