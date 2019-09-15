"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import bodyParser from 'body-parser';
// import helmet from 'helmet';
const env = process.env.NODE_ENV || `dev`;
// api
const apiVersion = `v1`;
const api = `/api/${apiVersion}`;
const config = require(`./src/config/config`)[env];
require(`./src/config/database`)(config);
const app = express_1.default();
app.listen(config.port, () => console.log(`Listening on port ${config.port}...`));
//# sourceMappingURL=index.js.map