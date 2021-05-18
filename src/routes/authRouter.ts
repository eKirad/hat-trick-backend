import * as express from 'express'
import AuthController from '../controllers/authController';

const router = express.Router();
router
    .post("/login", new AuthController().signup)

export default router;