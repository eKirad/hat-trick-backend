import { Application } from "express"
import router from "../routes"
import { contextPath, apiVersion } from "../shared/consts"

export const api = (app: Application) => app.use(`/${contextPath}/${apiVersion}`, router)
