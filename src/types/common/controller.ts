import { Request, Response, NextFunction } from "express"
import { HttpResponse } from "../httpTypes"

export interface Get<M> {
    getOne(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
    getAll(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
}

export interface Modify<M> {
    createOne(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
    updateOne(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
    deleteOne(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
}
