import { teamRoutes } from '../src/routes/team-routes';

const apiVersion = `api/v1`;

export const api = (app: any) => {
    // Call team routes
    teamRoutes(app, apiVersion);
};
