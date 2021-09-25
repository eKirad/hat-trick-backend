import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../config/logger";
import { createHttpErrorResponse, verifyAccessToken } from "../utils";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => { 
    try {
        const header = req.headers.authorization;
        const [ , token ] = header && header.split(` `);
        if (!token) createHttpErrorResponse(res, StatusCodes.UNAUTHORIZED);
        req.user = verifyAccessToken(token)
        next()
    } catch(e) {
        next(e);
        logger.error(`Authentication error occured: ${e}`)
    }
};