import { Request } from "express"
import { HttpRequest } from "../types/httpTypes/httpRequestType"

export const parseHttpRequest = <T>(req: Request, extractBodyFunction?: (requestBody: any) => T): HttpRequest<T> => {
    const { t, path, params, method, headers, body } = req

    try {
        return {
            t,
            path,
            params,
            method,
            headers,
            ...(extractBodyFunction && { dto: extractBodyFunction(body) }),
        }
    } catch (error) {
        console.error(error)
    }
}
