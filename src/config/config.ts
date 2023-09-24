import dotenv from "dotenv"
import { ConnectOptions } from "mongoose"
import { devDbConnectionOptions } from "../shared/consts"

dotenv.config()

export class Config {
    private _env: string
    private _dbURI: string
    private _dbConnectOptions: ConnectOptions
    private _port: number
    private _authSecret: string

    constructor() {
        this._env = process.env.NODE_ENV || `DEV`
        this.setConfigsForEnv(this._env)
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

    get port(): number {
        return this._port
    }

    get authSecret(): string {
        return this._authSecret
    }

    private setConfigsForEnv = (environment: string) => {
        switch (environment) {
            case `DEV`:
                this._dbURI = process.env.DB_URI || `mongodb://localhost:27047/`
                this._port = Number(process.env.SERVER_PORT) || 8000
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
