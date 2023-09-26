import { Request as ExpressRequest } from "express"
import { TFunction } from "i18next"

export interface HttpRequest<T> {
    t: TFunction
    path: any
    params: any
    method: any
    headers: any
    dto?: T
}
