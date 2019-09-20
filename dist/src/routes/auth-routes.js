"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth-controller");
exports.authRoutes = (app, apiVersion) => {
    app.post(`/${apiVersion}/signup`, auth_controller_1.authController.signup);
    app.post(`/${apiVersion}/login`, auth_controller_1.authController.login);
};
//# sourceMappingURL=auth-routes.js.map