import * as express from 'express'
import AuthController from '../controllers/authController';
import { loginValidationRules } from '../middlewares';
import { validateRules } from '../middlewares';

const router = express.Router();
const path = `auth`

router
    .post(`/${path}/signup`, AuthController.signup)
    .post(`/${path}/login`, loginValidationRules(), validateRules, AuthController.login)

export default router;
