"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Config {
    constructor() {
        this._environment = process.env.NODE_ENV;
        this.setConfigForEnv(this._environment);
    }
    get environment() {
        return this._environment;
    }
    get dbURI() {
        return this._dbURI;
    }
    get dbName() {
        return this._dbName;
    }
    get port() {
        return this._port;
    }
    get authSecret() {
        return this._authSecret;
    }
    setConfigForEnv(environment) {
        switch (environment) {
            case `DEV`:
                this._dbURI = process.env.DB_URI || `mongodb://localhost:27017/`;
                this._dbName = process.env.DB_NAME || `hattrickDB`;
                this._port = process.env.SERVER_PORT;
                this._authSecret = process.env.JWT_SECRET || `very secret secret`;
                break;
            case `PROD`:
                break;
        }
    }
}
exports.Config = Config;
//# sourceMappingURL=Config.js.map