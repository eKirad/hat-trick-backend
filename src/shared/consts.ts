import { ConnectOptions } from "mongoose"
import dotenv from "dotenv"
import { RepositoryOptions } from "../types/common"
import { ServiceQueryOptions } from "../types/common/service"

dotenv.config()

export const contextPath = process.env.CONTEXT_PATH || `api`
export const apiVersion = process.env.API_VERSION || `v1`

export const devDbConnectionOptions: ConnectOptions = { dbName: "test" }

export const defaultRepositoryOptions: RepositoryOptions = {
    populate: false,
    lean: true,
    excludeFields: true,
}

export const defaultServiceOptions: ServiceQueryOptions = {
    shouldConvertToDTO: true,
}
