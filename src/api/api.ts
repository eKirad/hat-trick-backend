import AuthController from '../controllers/authController';
import express, { Application } from 'express';
import router from '../routes';

const contextPath = process.env.CONTEXT_PATH;
const apiVersion = process.env.CONTEXT_PATH;

export const api = (app: Application) => {
    app.use(`${apiVersion}`, router)
    // const authController = new AuthController();
    // app.use(`${apiVersion}${authController.path}`, authController.router);
};
