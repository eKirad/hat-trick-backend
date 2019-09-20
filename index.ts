import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { api } from './src/api';
import { config } from './src/config/config';
import { database } from './src/config/database';

// import helmet from 'helmet';

// DRY!
dotenv.config();
const env = process.env.NODE_ENV

const app = express();

// Connect to the database
database(config[env]);

// Set all API Endpoints
api(app);

app.listen(config[env].port, () => console.log(`Listening on port ${config[env].port}...`));