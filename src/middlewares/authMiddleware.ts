import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../config/logger";
import { createHttpErrorResponse, verifyAccessToken } from "../utils";

export const authMiddleware = ({ headers, user, t}: Request, res: Response, next: NextFunction) => { 
    try {
        const header = headers.authorization;
        const [ , token ] = header && header.split(` `);
        if (!token) return createHttpErrorResponse(res, StatusCodes.UNAUTHORIZED, t("middleware:user_not_authorized"));
        user = verifyAccessToken(token);
        next();
    } catch(e) {
        next(e);
        logger.error(`Authentication error occured: ${e}`);
        throw createHttpErrorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, t("middleware:user_not_authorized"));
    }
};