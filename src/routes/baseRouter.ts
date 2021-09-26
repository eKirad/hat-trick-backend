import express from "express";
import { authMiddleware } from "../middlewares";

export const generateBaseRoutes = (endpoint: string, controller: any) => {
    const router = express.Router();
    router
        .get(`/${endpoint}`, authMiddleware, controller.getAll)
        .get(`/${endpoint}/:id`,authMiddleware, controller.getOne)
        .post(`/${endpoint}`, authMiddleware, controller.createOne)
        .put(`/${endpoint}/:id`, authMiddleware, controller.updateOne)
        .delete(`/${endpoint}/:id`, authMiddleware, controller.deleteOne)
    
    return router;
}