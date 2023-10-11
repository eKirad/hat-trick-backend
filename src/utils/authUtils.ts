import * as jwt from "jsonwebtoken"

export const verifyAccessToken = async (token: string, authSecret: string) => jwt.verify(token, authSecret)
