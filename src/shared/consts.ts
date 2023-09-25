import { ConnectOptions } from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const contextPath = process.env.CONTEXT_PATH || `api`
export const apiVersion = process.env.API_VERSION || `v1`

export const devDbConnectionOptions: ConnectOptions = { dbName: "test", useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
