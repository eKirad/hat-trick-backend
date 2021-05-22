import * as express from 'express'
import authRouter from './authRouter';
import userRouter from './userRouter';

const router = express.Router();

export default router.use([
    authRouter,
    userRouter
]);