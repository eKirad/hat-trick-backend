"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const team_controller_1 = require("../controllers/team-controller");
exports.teamRoutes = (app, api) => {
    app.get(`/teams`, team_controller_1.teamController.getAllTeams);
};
//# sourceMappingURL=team-routes.js.map