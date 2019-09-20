import { teamController } from '../controllers/team-controller';

export const teamRoutes = (app: any, apiVersion: string) => {
    app.get(`/${apiVersion}/teams`, teamController.getAllTeams);
    app.post(`/${apiVersion}/teams`, teamController.getAllTeams);
}