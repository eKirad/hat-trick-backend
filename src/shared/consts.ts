import { ConnectOptions } from "mongoose"
import dotenv from "dotenv"
import { EnvironmentEnum, RepositoryOptions } from "../types/common"
import { ServiceQueryOptions } from "../types/common/service"

dotenv.config()

export const contextPath = process.env.CONTEXT_PATH
export const apiVersion = process.env.API_VERSION
export const isDev = process.env.NODE_ENV === EnvironmentEnum.DEV
export const isProd = process.env.NODE_ENV === EnvironmentEnum.PROD

export const devDbConnectionOptions: ConnectOptions = { dbName: "test" }

export const defaultRepositoryOptions: RepositoryOptions = {
    populate: false,
    lean: true,
    excludeFields: true,
}

export const defaultServiceOptions: ServiceQueryOptions = {
    shouldConvertToDTO: true,
}
