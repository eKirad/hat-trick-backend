import { teamController } from '../controllers/team-controller';
import { middleware } from '../middlewares/middleware';

export const teamRoutes = (app: any, apiVersion: string) => {
    app.get(`/${apiVersion}/teams`, teamController.getAllTeams);
    app.post(`/${apiVersion}/teams`, middleware.isAuthenticated, middleware.isAdmin, teamController.addTeam);
    app.delete(`/${apiVersion}/teams/:id`, middleware.isAuthenticated, middleware.isAdmin, teamController.deleteTeam);
};