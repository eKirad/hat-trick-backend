import { Application } from "express";
import * as bodyParser from 'body-parser'

export const commonMiddlewares = (app: Application) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
}