import { Request, Response, NextFunction } from "express"
import { HttpResponse } from "../httpTypes"
import { HttpRequest } from "../httpTypes/httpRequestType"

export interface Get<M> {
    getOne(request: HttpRequest<M>, response: Response, next: NextFunction): Promise<HttpResponse<M>>
    getAll(request: HttpRequest<M>, response: Response, next: NextFunction): Promise<HttpResponse<M>>
}

export interface Modify<M> {
    createOne(request: HttpRequest<M>, response: Response, next: NextFunction): Promise<HttpResponse<M>>
    updateOne(request: HttpRequest<M>, response: Response, next: NextFunction): Promise<HttpResponse<M>>
    deleteOne(request: HttpRequest<M>, response: Response, next: NextFunction): Promise<HttpResponse<M>>
}
