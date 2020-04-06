import express from 'express';

import { api } from './src/api/api';
import { middlewares } from './src/middlewares';
import { Database } from './src/config/Database';
import { Config } from './src/config/Config';

(async () => {
    try {
        // App config
        const config = new Config();
        // Connect to the database
        const database = new Database(config.dbURI, config.dbName);
        await database.connect();
        const app: express.Application = express();
        // Apply middlewares
        middlewares(app);
        // Set up API
        api(app);
    
        app.listen(config.port, () => console.log(`Listening on port ${config.port}...`));
    } catch(e) {
        console.log(e);
    }
})();