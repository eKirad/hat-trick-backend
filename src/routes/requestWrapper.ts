import { Request, Response, NextFunction } from "express"
import { HttpRequest } from "../types/httpTypes/httpRequestType"
import { parseHttpRequest } from "../utils/request.utils"

export const requestWrapper =
    (controllerFunction: <T>(httpRequest?: HttpRequest<T>, res?: Response) => Promise<any>, extractBodyFunction?: <T>(requestBody: any) => T) =>
    async (req: Request, res: Response) => {
        try {
            const customHttpRequest = extractBodyFunction ? parseHttpRequest(req, extractBodyFunction) : parseHttpRequest(req)
            await controllerFunction(customHttpRequest, res)
        } catch (error) {}
    }
