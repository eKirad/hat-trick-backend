import express from "express"
import { authMiddleware } from "../middlewares"
import { objectIdMiddleware } from "../middlewares"
import { requestWrapper } from "./requestWrapper"

export const generateBaseRoutes = (endpoint: string, controller: any, extractBody: any) => {
    const router = express.Router()
    router
        .get(`/${endpoint}`, authMiddleware, requestWrapper(controller.getAll))
        .get(`/${endpoint}/:id`, authMiddleware, objectIdMiddleware, requestWrapper(controller.getOne))
        .post(`/${endpoint}`, requestWrapper(controller.createOne, extractBody))
        .put(`/${endpoint}/:id`, authMiddleware, objectIdMiddleware, requestWrapper(controller.updateOne, extractBody))
        .delete(`/${endpoint}/:id`, authMiddleware, objectIdMiddleware, requestWrapper(controller.deleteOne))

    return router
}
