import * as express from 'express'
import AuthController from '../controllers/authController';

const router = express.Router();
const path = `auth`

router
    .post(`/${path}/signup`, new AuthController().signup)
    .post(`/${path}/login`, new AuthController().login)

export default router;