import { check, ValidationChain } from "express-validator";

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
