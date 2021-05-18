import * as express from 'express'
import authRouter from './authRouter';

const router = express.Router();

export default router.use([
    authRouter
]);