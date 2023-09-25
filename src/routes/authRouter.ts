import * as express from "express"
import AuthController from "../controllers/authController"
import { authValidationRules } from "../middlewares"
import { validateRules } from "../middlewares"
import { AUTH_PATH } from "./consts"

const router = express.Router()
const path = AUTH_PATH

router.post(`/${path}/signup`, authValidationRules(), validateRules, AuthController.signup).post(`/${path}/login`, authValidationRules(), validateRules, AuthController.login)

export default router
