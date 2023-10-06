import dotenv from "dotenv"
import { ConnectOptions } from "mongoose"
import { devDbConnectionOptions } from "../shared/consts"
import { EnvironmentEnum } from "../types"

dotenv.config()

export class Config {
    private _env: EnvironmentEnum
    private _dbURI: string
    private _dbConnectOptions: ConnectOptions
    private _port: number
    private _authSecret: string

    constructor() {
        this._env = process.env.NODE_ENV as EnvironmentEnum
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

    private setConfigsForEnv = (environment: EnvironmentEnum) => {
        switch (environment) {
            case EnvironmentEnum.DEV:
                this._dbURI = process.env.DB_URI
                this._port = Number(process.env.SERVER_PORT)
                this._dbConnectOptions = devDbConnectionOptions
                this._authSecret = process.env.JWT_SECRET
                break
            case EnvironmentEnum.PROD:
                break
            default:
                break
        }
    }
}
