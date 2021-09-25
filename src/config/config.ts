import dotenv from 'dotenv';
import winston, { format } from 'winston';

dotenv.config();

export class Config {
    private _env: string;
    private _dbURI: string;
    private _dbName: string;
    private _port: string;
    private _authSecret: string;

    constructor() {
        this._env = process.env.NODE_ENV;
        this.setConfigForGivenEnv(this._env);
    }

    get environment(): string {
        return this._env;
    }

    get dbURI(): string {
        return this._dbURI;
    }

    get dbName(): string {
        return this._dbName;
    }

    get port(): string {
        return this._port;
    }

    get authSecret(): string {
        return this._authSecret;
    }

    private setConfigForGivenEnv = (environment: string) => {
        switch(environment) {
            case `DEV`:
                this._dbURI = process.env.DB_URI || `mongodb://localhost:27017/`;
                this._dbName = process.env.DB_NAME || `hattrickDB`;
                this._port = process.env.SERVER_PORT;
                this._authSecret = process.env.JWT_SECRET || `very secret secret`;
                break;
            case `PROD`:
                break;
            default:
                break;
        }
    }
}