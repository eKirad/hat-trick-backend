import express from 'express';

import { api } from './src/api/api';
import { config, environment } from './src/config';
import { connectToDB } from './src/config/database';
import { middlewares } from './src/middlewares';

// Set environment
const ENV = environment;

const app: express.Application = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));

// Apply middlewares
middlewares(app);

// Connect to the database
connectToDB(config[ENV]);

// Set all API Endpoints
api(app);

app.listen(config[ENV].APP.PORT, () => console.log(`Listening on port ${config[ENV].APP.PORT}...`));