import { Application } from "express"
import router from "../routes"
import { ApiConfigs } from "../config/config"

export const api = (app: Application, { contextPath, apiVersion }: ApiConfigs) => app.use(`/${contextPath}/${apiVersion}`, router)
