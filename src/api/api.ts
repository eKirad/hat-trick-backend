import { Application } from 'express';
import router from '../routes';

const contextPath = process.env.CONTEXT_PATH;
const apiVersion = process.env.API_VERSION;

export const api = (app: Application) => {
    app.use(`/${contextPath}/${apiVersion}`, router)
};
