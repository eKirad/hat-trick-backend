import express from 'express';
import dotenv from 'dotenv';
import { api } from './src/api';
import { config } from './src/config/config';
import { database } from './src/config/database';
// import bodyParser from 'body-parser';
// import helmet from 'helmet';

// DRY!
dotenv.config();
const env = process.env.NODE_ENV

const app = express();

database(config[env])
api(app);

app.listen(config[env].port, () => console.log(`Listening on port ${config[env].port}...`));