import { check, ValidationChain } from "express-validator"
import { FORBIDDEN_EMAILS_LIST } from "../../shared/consts"
import { existsAndNotEmptyValidationChain, minLengthValidationChain } from "../shared/rules"

export const loginValidationRules = (): ValidationChain[] => [emailCheck(), loginPasswordCheck()]
export const signupValidationRules = (): ValidationChain[] => [emailCheck(), signupPasswordCheck()]

const emailCheck = () => {
    const chain = check("email")

    existsAndNotEmptyValidationChain(chain, "props:auth.email")
    chain.isEmail().withMessage((_, { req: { t } }) => t("middleware:email_not_valid"))
    chain.custom((v) => !FORBIDDEN_EMAILS_LIST.includes(v)).withMessage((_, { req: { t } }) => t("middleware:email_disallowed"))

    return chain
}

const loginPasswordCheck = () => {
    const chain = check("password")

    existsAndNotEmptyValidationChain(chain, "props:auth.password")

    return chain
}

const signupPasswordCheck = () => {
    const chain = check("password")
    const prop = "props:auth.password"

    existsAndNotEmptyValidationChain(chain, prop)
    minLengthValidationChain(chain, prop, 6)

    return chain
}
