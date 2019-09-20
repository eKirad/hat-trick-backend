import { teamRoutes } from '../src/routes/team-routes';
import { authRoutes } from '../src/routes/auth-routes';

const apiVersion = `api/v1`;

export const api = (app: any) => {
    // Call team routes
    teamRoutes(app, apiVersion);

    // Call auth routes
    authRoutes(app, apiVersion);
};
