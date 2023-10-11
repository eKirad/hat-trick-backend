import express from "express"

import { api } from "./api/api"
import { commonMiddlewares } from "./middlewares"
import Database from "./config/database"
import { Config } from "./config/config"
import logger from "./config/logger/winstonLogger"
import dbSeedService from "./services/dbSeedService"
;(async () => {
    const { dbConfigs, apiConfigs, port, envConfigs, authSecret } = new Config()

    try {
        const database = new Database(dbConfigs)
        await database.connect()
        const app = express()
        commonMiddlewares(app, envConfigs.env, authSecret)
        api(app, apiConfigs)
        app.listen(port, () => logger.info(`Listening on port ${port}...`))
        if (envConfigs.shouldRunDBSeed) await dbSeedService.runDBSeed()
    } catch (error) {
        logger.error(`Server start failed with ${error}`)
        process.exit(1)
    }
})()
