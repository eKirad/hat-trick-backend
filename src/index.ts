import express from "express"

import { api } from "./api/api"
import { commonMiddlewares } from "./middlewares"
import Database from "./config/database"
import { Config } from "./config/config"
import logger from "./config/logger/winstonLogger"
;(async () => {
    const { dbConfigs, apiConfigs, port } = new Config()

    try {
        const database = new Database(dbConfigs)
        await database.connect()
        const app = express()
        commonMiddlewares(app)
        api(app, apiConfigs)
        app.listen(port, () => logger.info(`Listening on port ${port}...`))
    } catch (e) {
        logger.error(e)
    }
})()
