import { ConnectOptions } from "mongoose"
import { RepositoryOptions } from "../types/common"
import { ServiceQueryOptions } from "../types/common/service"
import dotenv from "dotenv"

dotenv.config()

export const isNotProd = process.env.NODE_ENV !== `PROD`

export const devDbConnectionOptions: ConnectOptions = { dbName: "test" }

export const defaultRepositoryOptions: RepositoryOptions = {
    populate: false,
    lean: true,
    excludeFields: true,
}

export const defaultServiceOptions: ServiceQueryOptions = {
    shouldConvertToDTO: true,
}
