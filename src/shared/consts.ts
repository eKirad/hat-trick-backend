import { ConnectOptions } from "mongoose"

export const contextPath = process.env.CONTEXT_PATH
export const apiVersion = process.env.API_VERSION

export const devDbConnectionOptions: ConnectOptions = { dbName: "test", useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
