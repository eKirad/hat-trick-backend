"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = require("./src/api");
const config_1 = require("./src/config/config");
const database_1 = require("./src/config/database");
// import helmet from 'helmet';
// DRY!
dotenv_1.default.config();
const env = process.env.NODE_ENV;
const app = express_1.default();
database_1.database(config_1.config[env]);
api_1.api(app);
app.listen(config_1.config[env].port, () => console.log(`Listening on port ${config_1.config[env].port}...`));
//# sourceMappingURL=index.js.map