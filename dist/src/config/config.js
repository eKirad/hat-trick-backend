"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DRY!!!
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.SERVER_PORT;
// const dbURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds058369.mlab.com:58369/hat-trick`;
const dbURI = `mongodb://localhost:27017/`;
const jwtSecret = process.env.JWT_SECRET || `very secret secret`;
const dbName = process.env.MONGODB_DATABASE_NAME || `hattrickDB`;
exports.environment = process.env.NODE_ENV;
exports.config = {
    dev: {
        port,
        dbURI,
        jwtSecret,
        dbName
    },
    prod: {}
};
//# sourceMappingURL=config.js.map