import { Request, Response, NextFunction } from "express"

export interface ExpressRequestWithAuthSecret extends Request {
    authSecret: string
}

export const attachConfigToRequest = (authSecret: string) => (req: ExpressRequestWithAuthSecret, _res: Response, next: NextFunction) => {
    req.authSecret = authSecret
    next()
}
