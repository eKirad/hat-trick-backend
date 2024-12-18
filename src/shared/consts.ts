import { ConnectOptions } from "mongoose"
import { ServiceQueryOptions, RepositoryOptions } from "../types"
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

export const HEADER_SPLIT_DELIMITER = ` `
export const FORBIDDEN_EMAILS_LIST = []
