import express from "express"
import { authMiddleware } from "../middlewares"
import { objectIdMiddleware } from "../middlewares"
import { requestWrapper } from "./requestWrapper"

export const generateBaseRoutes = (endpoint: string, controller: any, extractBodyFunction: any) => {
    const router = express.Router()
    router
        .get(`/${endpoint}`, authMiddleware, requestWrapper(controller.getAll))
        .get(`/${endpoint}/:id`, authMiddleware, objectIdMiddleware, requestWrapper(controller.getOne))
        .post(`/${endpoint}`, authMiddleware, requestWrapper(controller.createOne, extractBodyFunction))
        .put(`/${endpoint}/:id`, authMiddleware, objectIdMiddleware, requestWrapper(controller.updateOne, extractBodyFunction))
        .delete(`/${endpoint}/:id`, authMiddleware, objectIdMiddleware, requestWrapper(controller.deleteOne))

    return router
}
