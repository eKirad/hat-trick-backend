import { Application } from "express"
import cors from "cors"
import * as bodyParser from "body-parser"
import * as i18nextMiddleware from "i18next-http-middleware"
import i18next from "../shared/locales/i18next"
import morgan from "morgan"
import { getMorganLoggerArgumentsForEnv } from "../config/logger/morganLogger"
import { EnvironmentEnum } from "../types"
import { attachAuthSecretToRequest } from "./auth/attachAuthSecretMiddleware"

export const commonMiddlewares = (app: Application, env: EnvironmentEnum, authSecret: string) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cors())
    app.use(i18nextMiddleware.handle(i18next))
    app.use(attachAuthSecretToRequest(authSecret))
    const { format, options } = getMorganLoggerArgumentsForEnv(env)
    app.use(morgan(format, options))
}
