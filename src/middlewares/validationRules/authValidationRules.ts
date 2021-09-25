import { check, ValidationChain } from "express-validator";

export const authValidationRules = (): ValidationChain[] => [
    check("email")
        .exists()
        .withMessage((_, { req: { t }}) => t("middleware:required", { field: "Email"}))
        .isEmail()
        .withMessage((_, { req: { t }}) => t("middleware:email_not_valid")),
    check("password")
        .exists()
        .withMessage((_, { req: { t }}) => t("middleware:required", { fieled: "Password"}))
        .isLength({ min: 6})
        .withMessage((_, { req: { t }}) => t("password_min_length", { fieled: "Password"}))
];