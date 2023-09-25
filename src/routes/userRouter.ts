import UserController from "../controllers/userController"
import { generateBaseRoutes } from "./baseRouter"
import { USER_PATH } from "./consts"

const path = USER_PATH
const router = generateBaseRoutes(path, UserController)

// TODO: Other additional routes
// router
//     .get(`/${path}`, new UserController().getAll)

export default router
