"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("./src/api/api");
const middlewares_1 = require("./src/middlewares");
const Database2_1 = require("./src/config/Database2");
const Config2_1 = require("./src/config/Config2");
// // Set environment
// const ENV = environment;
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Connect to the database
    try {
        const config = new Config2_1.Config();
        const database = new Database2_1.Database(config.dbURI, config.dbName);
        yield database.connect();
        const app = express_1.default();
        // await connectToDB(config[ENV]);
        // Apply middlewares
        middlewares_1.middlewares(app);
        // Set up API
        api_1.api(app);
        app.listen(config.port, () => console.log(`Listening on port ${config.port}...`));
    }
    catch (e) {
        console.log(e);
    }
}))();
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({
// //     extended: false
// // }));
// // Apply middlewares
// middlewares(app);
// // Connect to the database
// connectToDB(config[ENV]);
// // Set all API Endpoints
// api(app);
// app.listen(config[ENV].APP.PORT, () => console.log(`Listening on port ${config[ENV].APP.PORT}...`));
//# sourceMappingURL=index.js.map