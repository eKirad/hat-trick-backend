import { Response } from "express"
import { HttpRequest } from "../types/httpTypes/httpRequest.type"
import { parseHttpRequest } from "../utils/request.utils"
import { createHttpErrorResponse } from "../utils"
import { ExpressRequestWithAuthSecret } from "../middlewares/authSecretMiddleware"

export const requestWrapper =
    (controllerFunction: <T>(httpRequest?: HttpRequest<T>, res?: Response) => Promise<any>, extractBodyFunction?: <T>(requestBody: any) => T) =>
    async (req: ExpressRequestWithAuthSecret, res: Response) => {
        try {
            const customHttpRequest = extractBodyFunction ? parseHttpRequest(req, extractBodyFunction) : parseHttpRequest(req)
            await controllerFunction(customHttpRequest, res)
        } catch (error) {
            const { statusCode, errorMessage } = error
            createHttpErrorResponse(res, statusCode, errorMessage)
        }
    }
