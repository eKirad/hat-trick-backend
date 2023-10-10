import { Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import logger from "../config/logger/winstonLogger"
import { createHttpErrorResponse, verifyAccessToken } from "../utils"
import { HEADER_SPLIT_DELIMITER } from "../shared/consts"
import { ExpressRequestWithAuthSecret } from "./authSecretMiddleware"

export const authMiddleware = async (req: ExpressRequestWithAuthSecret, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization
        const [, token] = header && header.split(HEADER_SPLIT_DELIMITER)
        if (!token) return createHttpErrorResponse(res, StatusCodes.UNAUTHORIZED, req.t("middleware:user_not_authorized"))
        req.user = await verifyAccessToken(token, req.authSecret)
        next()
    } catch (error) {
        next(error)
        logger.error(`Authentication error ocurred: ${error}`)
        throw createHttpErrorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, req.t("middleware:user_not_authorized"))
    }
}
