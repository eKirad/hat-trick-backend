"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("./src/api/api");
const config_1 = require("./src/config");
const database_1 = require("./src/config/database");
const middlewares_1 = require("./src/middlewares");
// Set environment
const ENV = config_1.environment;
const app = express_1.default();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// Apply middlewares
middlewares_1.middlewares(app);
// Connect to the database
database_1.connectToDB(config_1.config[ENV]);
// Set all API Endpoints
api_1.api(app);
app.listen(config_1.config[ENV].APP.PORT, () => console.log(`Listening on port ${config_1.config[ENV].APP.PORT}...`));
//# sourceMappingURL=index.js.map