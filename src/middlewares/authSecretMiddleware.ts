import { Response, NextFunction } from "express"
import { CustomExpressRequest } from "../types/httpTypes/httpRequest.type"

export const attachConfigToRequest = (authSecret: string) => (req: CustomExpressRequest, _res: Response, next: NextFunction) => {
    req.authSecret = authSecret
    next()
}
