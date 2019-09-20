"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const user_service_1 = require("../services/user-service");
const isAuthenticated = (req, res, next) => {
    let token = ``;
    if (req.headers.authorization) {
        token = req.headers.authorization.substring(4);
    }
    if (!token) {
        return res.status(401)
            .sned({
            error: `Unauthorized`,
            message: `No token provided in the request`
        });
    }
    jsonwebtoken_1.default.verify(token, config_1.config.dev.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401)
                .send({
                error: `Unauthorized`,
                message: `No token provided in the request`
            });
        }
        req.userId = decoded.id;
        next();
    });
};
const isAdmin = (req, res, next) => {
    const currentUser = user_service_1.userService.getCurrentUser(req.headers.authorization);
    if (currentUser.role !== `admin`) {
        return res.status(401).send({
            error: `Unauthorized`,
            message: `Permission denied. No admin rights`
        });
    }
    next();
};
exports.middleware = {
    isAuthenticated,
    isAdmin
};
//# sourceMappingURL=middleware.js.map