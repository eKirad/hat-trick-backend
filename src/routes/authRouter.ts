import * as express from "express"
import AuthController from "../controllers/authController"
import { authValidationRules } from "../middlewares"
import { validateRules } from "../middlewares"
import { AUTH_PATH } from "./consts"
import { requestWrapper } from "./requestWrapper"

const router = express.Router()
const path = AUTH_PATH

const extractUserRequestBody = (requestBody: any): any => ({
    email: requestBody.email,
    password: requestBody.password,
    firstName: requestBody.firstName,
    lastName: requestBody.lastName,
})

router
    .post(`/${path}/signup`, authValidationRules(), validateRules, requestWrapper(AuthController.signup, extractUserRequestBody))
    .post(`/${path}/login`, authValidationRules(), validateRules, requestWrapper(AuthController.login, extractUserRequestBody))

export default router
