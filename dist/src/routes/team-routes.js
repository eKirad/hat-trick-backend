"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const team_controller_1 = require("../controllers/team-controller");
const middleware_1 = require("../middlewares/middleware");
exports.teamRoutes = (app, apiVersion) => {
    app.get(`/${apiVersion}/teams`, team_controller_1.teamController.getAllTeams);
    app.post(`/${apiVersion}/teams`, middleware_1.middleware.isAuthenticated, middleware_1.middleware.isAdmin, team_controller_1.teamController.addTeam);
    app.delete(`/${apiVersion}/teams/:id`, middleware_1.middleware.isAuthenticated, middleware_1.middleware.isAdmin, team_controller_1.teamController.deleteTeam);
};
//# sourceMappingURL=team-routes.js.map