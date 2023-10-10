import { Response, NextFunction } from "express"
import { HttpResponse } from "../httpTypes"
import { HttpRequest } from "../httpTypes/httpRequest.type"

export interface Get<T> {
    getOne(request: HttpRequest<T>, response: Response, next: NextFunction): Promise<HttpResponse<T>>
    getAll(request: HttpRequest<T>, response: Response, next: NextFunction): Promise<HttpResponse<T>>
}

export interface Modify<T> {
    createOne(request: HttpRequest<T>, response: Response, next: NextFunction): Promise<HttpResponse<T>>
    updateOne(request: HttpRequest<T>, response: Response, next: NextFunction): Promise<HttpResponse<T>>
    deleteOne(request: HttpRequest<T>, response: Response, next: NextFunction): Promise<HttpResponse<T>>
}
