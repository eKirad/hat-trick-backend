import { teamController } from '../controllers/team-controller';


module.exports = (app: any, api: any) => {
    app.get(`/teams`, teamController.getAllTeams)
}