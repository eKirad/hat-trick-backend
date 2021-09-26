import * as express from 'express'
import AuthController from '../controllers/authController';
import { authValidationRules } from '../middlewares';
import { validateRules } from '../middlewares';

const router = express.Router();
const path = `auth`

router
    .post(`/${path}/signup`, authValidationRules(), validateRules, AuthController.signup)
    .post(`/${path}/login`, authValidationRules(), validateRules, AuthController.login)

export default router;
