import { teamController } from '../controllers/team-controller';

export const teamRoutes = (app: any, api: any) => {
    app.get(`/teams`, teamController.getAllTeams)
}