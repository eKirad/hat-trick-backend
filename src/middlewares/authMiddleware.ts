import { Request, Response, NextFunction } from "express";
import { check, ValidationChain } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { createHttpErrorResponse, verifyAccessToken } from "../utils";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => { 
    try {
        const header = req.headers.authorization;
        const [ , token ] = header && header.split(` `);
        if (!token) createHttpErrorResponse(res, StatusCodes.UNAUTHORIZED);
        req.user = verifyAccessToken(token)
        next()
    } catch(error) {
        next(error);
        // TODO: Add logger
    }
};