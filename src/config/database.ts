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
            const connectString = this.dbURI + this.dbConnectOptions.dbName
            await mongoose.connect(connectString, this.dbConnectOptions)
            logger.info(`Database up and running!`)
        } catch (e) {
            logger.error(`Database connection unsuccessful. Error: ${e}`)
        }
    }
}
