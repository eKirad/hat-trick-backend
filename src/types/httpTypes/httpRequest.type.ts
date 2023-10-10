import { TFunction } from "i18next"

export interface HttpRequest<T> {
    t: TFunction
    path: any
    params: any
    method: any
    headers: any
    authSecret: string
    dto?: T
}
