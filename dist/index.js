"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const api_1 = require("./src/api");
const config_1 = require("./src/config/config");
const database_1 = require("./src/config/database");
// import helmet from 'helmet';
const env = config_1.environment;
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false
}));
// Connect to the database
database_1.database(config_1.config[env]);
// Set all API Endpoints
api_1.api(app);
app.listen(config_1.config[env].port, () => console.log(`Listening on port ${config_1.config[env].port}...`));
//# sourceMappingURL=index.js.map