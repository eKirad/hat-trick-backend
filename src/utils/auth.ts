import * as jwt from "jsonwebtoken"
import { Config } from "../config/config"

// TODO: Check new Config()
export const verifyAccessToken = async (token: string) => jwt.verify(token, new Config().authSecret)
