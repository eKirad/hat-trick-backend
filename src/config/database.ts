import mongoose, { ConnectOptions } from "mongoose"
import logger from "../config/logger"
export default class Database {
    private dbURI: string
    private dbConnectOptions: ConnectOptions

    constructor(dbUri: string, dbConnectOptions: ConnectOptions) {
        this.dbURI = dbUri
        this.dbConnectOptions = dbConnectOptions
    }

    connect = async () => {
        try {
            logger.info(`[DATABASE CONFIG] Connecting to database...`)
            const connectString = this.dbURI + this.dbConnectOptions.dbName
            await mongoose.connect(connectString, this.dbConnectOptions)
            logger.info(`[DATABASE CONFIG] Database up and running!`)
        } catch (e) {
            logger.error(`[DATABASE CONFIG] Database connection unsuccessful. Error: ${e}`)
        }
    }
}
