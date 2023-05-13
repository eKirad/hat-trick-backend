import dotenv from "dotenv"
import { ConnectOptions } from "mongoose"
import { NodeEnvEnum } from "../types/node/NodeEnvEnum"
import { devDbConnectionOptions } from "../shared/consts"

dotenv.config()

export class Config {
    private _env: string
    private _dbURI: string
    private _dbConnectOptions: ConnectOptions
    private _port: string
    private _authSecret: string

    constructor() {
        this._env = process.env.NODE_ENV || `DEV`
        this.setConfigForGivenEnv(this._env)
    }

    get environment(): string {
        return this._env
    }

    get dbURI(): string {
        return this._dbURI
    }

    get dbConnectOptions(): ConnectOptions {
        return this._dbConnectOptions
    }

    get port(): string {
        return this._port
    }

    get authSecret(): string {
        return this._authSecret
    }

    private setConfigForGivenEnv = (environment: string) => {
        switch (environment) {
            case `DEV`:
                this._dbURI = process.env.DB_URI || `mongodb://localhost:27017/`
                this._port = process.env.SERVER_PORT
                this._dbConnectOptions = devDbConnectionOptions
                this._authSecret = process.env.JWT_SECRET || `very secret secret`
                break
            case `PROD`:
                break
            default:
                break
        }
    }
}
