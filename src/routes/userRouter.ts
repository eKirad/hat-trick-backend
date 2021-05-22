import * as express from 'express'
import AuthController from '../controllers/authController';
import { UserController } from '../controllers/userController';

const router = express.Router();
const path = `user`

router
    .get(`/${path}`, new UserController().getAll)

export default router;