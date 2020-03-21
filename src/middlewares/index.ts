import express from "express";
import bodyParser from 'body-parser';

export const middlewares = (app: express.Application) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
}