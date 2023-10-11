import dotenv from "dotenv"
import { ConnectOptions } from "mongoose"
import { devDbConnectionOptions } from "../shared/consts"
import { EnvironmentEnum } from "../types"
import { parseBooleanEnv } from "../utils"

dotenv.config()
export interface DbConfigs {
    dbUri: string
    dbConnectOptions: ConnectOptions
}
export interface ApiConfigs {
    contextPath: string
    apiVersion: string
}

export interface EnvConfigs {
    env: EnvironmentEnum
    shouldRunDBSeed: boolean
}
export class Config {
    private static instance: Config
    private _env: EnvironmentEnum
    private _dbURI: string
    private _dbConnectOptions: ConnectOptions
    private _port: number
    private _authSecret: string
    private _contextPath: string
    private _apiVersion: string
    private _shouldRunDBSeed: boolean

    private constructor() {
        this._env = process.env.NODE_ENV as EnvironmentEnum
        this.setConfigs()
    }

    private setConfigs = () => {
        this._dbURI = process.env.DB_URI
        this._port = Number(process.env.SERVER_PORT)
        this._dbConnectOptions = devDbConnectionOptions
        this._authSecret = process.env.JWT_SECRET
        this._contextPath = process.env.CONTEXT_PATH
        this._apiVersion = process.env.API_VERSION
        this._shouldRunDBSeed = parseBooleanEnv(process.env.RUN_DB_SEED)
    }

    public get envConfigs(): EnvConfigs {
        return {
            env: this._env,
            shouldRunDBSeed: this._shouldRunDBSeed,
        }
    }

    public get port(): number {
        return this._port
    }

    public get dbConfigs(): DbConfigs {
        return {
            dbUri: this._dbURI,
            dbConnectOptions: this._dbConnectOptions,
        }
    }

    public get authSecret(): string {
        return this._authSecret
    }

    public get apiConfigs(): ApiConfigs {
        return {
            apiVersion: this._apiVersion,
            contextPath: this._contextPath,
        }
    }

    public static getInstance(): Config {
        if (!Config.instance) Config.instance = new Config()

        return Config.instance
    }
}
