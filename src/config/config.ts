import dotenv from 'dotenv';
import winston, { format } from 'winston';

dotenv.config();

export class Config {
    private _environment: string;
    private _dbURI: string;
    private _dbName: string;
    private _port: string;
    private _authSecret: string;
    private _logger: winston.Logger;

    constructor() {
        this._environment = process.env.NODE_ENV;
        this._logger = winston.createLogger();
        this.setConfigForGivenEnv(this._environment);
        this.setLoggerForGivenEnv(this._environment);
    }

    get environment(): string {
        return this._environment;
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

    get logger(): winston.Logger {
        return this._logger;
    }

    private setLoggerForGivenEnv = (environment: string) => {
        this._logger.add(
            new winston.transports.File({
                level: `info`,
                filename: `backend.log`,
                format: format.combine(
                    format.timestamp({
                        format: `YYYY-MM-DD HH:mm:ss`
                    }),
                    format.json() 
                )
            }),
        );

        if (environment !== `PROD`) {
            this._logger.add(
                new winston.transports.Console({
                    format: format.simple()
                })
            );
        }
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