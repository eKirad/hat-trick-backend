"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const team_routes_1 = require("../src/routes/team-routes");
const auth_routes_1 = require("../src/routes/auth-routes");
const apiVersion = `api/v1`;
exports.api = (app) => {
    // Call team routes
    team_routes_1.teamRoutes(app, apiVersion);
    // Call auth routes
    auth_routes_1.authRoutes(app, apiVersion);
};
//# sourceMappingURL=api.js.map