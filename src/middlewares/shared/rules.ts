import { ValidationChain, validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"
import { createHttpErrorResponse } from "../../utils"
import { StatusCodes } from "http-status-codes"

export const validateRules = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) return next()
    return createHttpErrorResponse(res, StatusCodes.UNPROCESSABLE_ENTITY, errors.array())
}

export const existsAndNotEmptyValidationChain = (validationChain: ValidationChain, field: string) => {
    return validationChain
        .exists()
        .withMessage((_, { req: { t } }) => t("middleware:required", { field }))
        .bail()
        .isString()
        .withMessage((_, { req: { t } }) => t("middleware:not_string", { field }))
        .bail()
        .not()
        .isEmpty()
        .withMessage((_, { req: { t } }) => t("middleware:string_empty", { field }))
        .bail()
}

export const minLengthValidationChain = (validationChain: ValidationChain, field: string, minLength: number) => {
    return validationChain.isLength({ min: minLength }).withMessage((_, { req: { t } }) => t("password_min_length", { field }))
}
