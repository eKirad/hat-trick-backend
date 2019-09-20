"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const team_routes_1 = require("../src/routes/team-routes");
const apiVersion = `api/v1`;
exports.api = (app) => {
    // Call team routes
    team_routes_1.teamRoutes(app, apiVersion);
};
//# sourceMappingURL=api.js.map