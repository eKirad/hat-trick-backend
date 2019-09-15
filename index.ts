import express from 'express';
import dotenv from 'dotenv';
// import bodyParser from 'body-parser';
// import helmet from 'helmet';

// Replace this later
dotenv.config();
const env = process.env.NODE_ENV

// api
const apiVersion = `v1`;
const api = `/api/${apiVersion}`;
const config = require(`./src/config/config`)[env];
require(`./src/config/database`) (config);

const app = express();

// Call team routes
require(`./src/routes/team-routes`) (app);


app.listen(config.port, () => console.log(`Listening on port ${config.port}...`));

