import UserController from "../controllers/userController"
import { UserRegisterDTO } from "../types"
import { generateBaseRoutes } from "./baseRouter"
import { USER_PATH } from "./consts"

const path = USER_PATH

const extractRequestBody = (requestBody: any): UserRegisterDTO => ({
    email: requestBody.email,
    password: requestBody.password,
    firstName: requestBody.firstName,
    lastName: requestBody.lastName,
})

const router = generateBaseRoutes(path, UserController, extractRequestBody)

export default router
