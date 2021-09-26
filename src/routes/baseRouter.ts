import express from "express";
import { authMiddleware } from "../middlewares";
import { objectIdMiddleware } from "../middlewares";

export const generateBaseRoutes = (endpoint: string, controller: any) => {
    const router = express.Router();
    router
        .get(`/${endpoint}`, authMiddleware, controller.getAll)
        .get(`/${endpoint}/:id`, authMiddleware, objectIdMiddleware, controller.getOne)
        .post(`/${endpoint}`, authMiddleware, controller.createOne)
        .put(`/${endpoint}/:id`, authMiddleware, objectIdMiddleware, controller.updateOne)
        .delete(`/${endpoint}/:id`, authMiddleware, objectIdMiddleware, controller.deleteOne)
    
    return router;
}