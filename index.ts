import express from 'express';
// import bodyParser from 'body-parser';
// import helmet from 'helmet';
const env = process.env.NODE_ENV || `dev`;

// api
const apiVersion = `v1`;
const api = `/api/${apiVersion}`;
const config = require(`./src/config/config`)[env];
require(`./src/config/database`) (config);

const app = express();
app.listen(config.port, () => console.log(`Listening on port ${config.port}...`));

