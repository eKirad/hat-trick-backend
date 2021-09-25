import express from 'express';

import { api } from './api/api';
import { commonMiddlewares } from './middlewares';
import Database from './config/database';
import { Config } from './config/config';
import logger from './config/logger';

(async () => {
    // App config
    const config = new Config();
    
    try {
        // Connect to the database
        const database = new Database(config.dbURI, config.dbName, logger);
        await database.connect();
        const app = express();
        // Apply middlewares
        commonMiddlewares(app);
        // Set up API
        api(app);
        app.listen(config.port, () => logger.info(`Listening on port ${config.port}...`));
    } catch(e) {
        logger.error(e);
    }
})();