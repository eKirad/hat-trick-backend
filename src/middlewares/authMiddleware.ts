import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createHttpErrorResponse } from "../utils";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => { 
    try {
        const header = req.headers.authorization;
        const [ , token ] = header && header.split(` `);

        if (!token) {
            createHttpErrorResponse(res, StatusCodes.UNAUTHORIZED)
        } else {
            // TODO:
        }
        
    } catch(e) {
        next(e);
    }
};