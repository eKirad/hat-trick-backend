import { authController } from '../controllers/auth-controller';

export const authRoutes = (app: any, apiVersion: string) => {
    app.post(`/${apiVersion}/signup`, authController.signup);
    app.post(`/${apiVersion}/login`, authController.login);
};