import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from 'express';
import { createHttpErrorResponse } from "../utils";
import { StatusCodes } from "http-status-codes";

export const validateRules = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    return createHttpErrorResponse(res, StatusCodes.UNPROCESSABLE_ENTITY, errors.array());
}