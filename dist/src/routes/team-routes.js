"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const team_controller_1 = require("../controllers/team-controller");
exports.teamRoutes = (app, apiVersion) => {
    app.get(`/${apiVersion}/teams`, team_controller_1.teamController.getAllTeams);
    app.post(`/${apiVersion}/teams`, team_controller_1.teamController.addTeam);
};
//# sourceMappingURL=team-routes.js.map