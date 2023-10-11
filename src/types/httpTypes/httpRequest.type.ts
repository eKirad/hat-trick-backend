import { TFunction } from "i18next"
import { Request } from "express"
export interface CustomExpressRequest extends Request {
    authSecret: string
}

export interface HttpRequest<T> {
    t: TFunction
    path: any
    params: any
    method: any
    headers: any
    authSecret: string
    dto?: T
}
