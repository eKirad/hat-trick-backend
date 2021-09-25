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

export const loginValidationRules = (): ValidationChain[] => [
    check("email")
        .exists()
        .withMessage((_, { req: { t }}) => t("middleware:required", { field: "Email"}))
        .isEmail()
        .withMessage((_, { req: { t }}) => t("middleware:email_not_valid")),
    check("password")
        .exists()
        .withMessage((_, { req: { t }}) => t("middleware:required", { fieled: "Password"}))
];
