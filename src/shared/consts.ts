import { ConnectOptions } from "mongoose"
import { RepositoryOptions } from "../types/common"
import { ServiceQueryOptions } from "../types/common/mvc.types"
import dotenv from "dotenv"

dotenv.config()

export const isNotProd = process.env.NODE_ENV !== `PROD`

export const devDbConnectionOptions: ConnectOptions = { dbName: "test" }

export const shouldRunDBSeed = process.env.RUN_DB_MIGRATIONS

export const defaultRepositoryOptions: RepositoryOptions = {
    populate: false,
    lean: true,
    excludeFields: true,
}

export const defaultServiceOptions: ServiceQueryOptions = {
    shouldConvertToDTO: true,
}
