import express from 'express';
import bodyParser from 'body-parser';
import { api } from './src/api/api';
import { config, environment } from './src/config/config';
import { database } from './src/config/database';

const env = environment;

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Connect to the database
database(config[env]);

// Set all API Endpoints
api(app);

app.listen(config[env].port, () => console.log(`Listening on port ${config[env].port}...`));