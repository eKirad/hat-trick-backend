import { Application } from "express"
import * as bodyParser from "body-parser"
import * as i18nextMiddleware from "i18next-http-middleware"
import i18next from "../shared/locales/i18next"
import morgan from "morgan"
import { getMorganLoggerArgumentsForEnv } from "../config/logger/morganLogger"
import { EnvironmentEnum } from "../types"

export const commonMiddlewares = (app: Application) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(i18nextMiddleware.handle(i18next))
    // TODO: Check for the right env
    const env = "DEV" as EnvironmentEnum
    const { format, options } = getMorganLoggerArgumentsForEnv(env)
    app.use(morgan(format, options))
}
