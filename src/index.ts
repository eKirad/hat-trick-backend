import express from "express"

import { api } from "./api/api"
import { commonMiddlewares } from "./middlewares"
import Database from "./config/database"
import { Config } from "./config/config"
import logger from "./config/logger/winstonLogger"
;(async () => {
    const config = new Config()

    try {
        const database = new Database(config.dbURI, config.dbConnectOptions)
        await database.connect()
        const app = express()
        commonMiddlewares(app)
        api(app)
        app.listen(config.port, () => logger.info(`Listening on port ${config.port}...`))
    } catch (e) {
        logger.error(e)
    }
})()
