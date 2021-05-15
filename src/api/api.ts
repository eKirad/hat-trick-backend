import AuthController from '../controllers/authController';
import express from 'express';

const apiVersion = `/api/v1`;

export const api = (app: express.Application) => {
    const authController = new AuthController();
    app.use(`${apiVersion}${authController.path}`, authController.router);
};
