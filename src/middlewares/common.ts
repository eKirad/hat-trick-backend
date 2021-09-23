import { Application } from 'express';
import * as bodyParser from 'body-parser'
import * as i18nextMiddleware from 'i18next-http-middleware'
import i18next from 'i18next';

export const commonMiddlewares = (app: Application) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(i18nextMiddleware.handle(i18next))
}