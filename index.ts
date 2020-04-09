import express from 'express';

import { api } from './src/api/api';
import { middlewares } from './src/middlewares';
import { Database } from './src/config/Database';
import { Config } from './src/config/Config';

(async () => {
    // App config
    const config = new Config();
    
    try {
        // Connect to the database
        const database = new Database(config.dbURI, config.dbName, config.logger);
        await database.connect();
        const app: express.Application = express();
        // Apply middlewares
        middlewares(app);
        // Set up API
        api(app);
        config.logger.info(`Testing the emojis`);
        app.listen(config.port, () => config.logger.info(`Listening on port ${config.port}...`));
    } catch(e) {
        config.logger.error(e);
    }
})();