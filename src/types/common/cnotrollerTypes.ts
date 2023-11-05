import { Response, NextFunction } from "express"
import { HttpResponse } from "../httpTypes"
import { HttpRequest } from "../httpTypes/httpRequest.type"

export interface Get<DTO> {
    getOne(request: HttpRequest<DTO>, response: Response, next: NextFunction): Promise<HttpResponse<DTO>>
    getAll(request: HttpRequest<DTO>, response: Response, next: NextFunction): Promise<HttpResponse<DTO>>
}

export interface Modify<DTO> {
    createOne(request: HttpRequest<DTO>, response: Response, next: NextFunction): Promise<HttpResponse<DTO>>
    updateOne(request: HttpRequest<DTO>, response: Response, next: NextFunction): Promise<HttpResponse<DTO>>
    deleteOne(request: HttpRequest<DTO>, response: Response, next: NextFunction): Promise<HttpResponse<DTO>>
}
