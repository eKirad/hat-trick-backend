import express from "express";

export const generateCRUDRoutes = (endpoint: string, controller: any) => {
    const router = express.Router();

    router
        .get(`/${endpoint}`, controller.getAll)
        .get(`/${endpoint}/:id`, controller.getOne)
        .post(`/${endpoint}`, controller.createOne)
        .put(`/${endpoint}/:id`, controller.updateOne)
        .delete(`/${endpoint}/:id`, controller.deleteOne)
    
    return router;
}