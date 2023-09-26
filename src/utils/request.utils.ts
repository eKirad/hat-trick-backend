import { Request } from "express"
import { HttpRequest } from "../types/httpTypes/httpRequestType"

export const parseHttpRequest = <T>(req: Request, extractBodyFunction?: (requestBody: any) => T): HttpRequest<T> => {
    const { t, path, params, method, headers, body } = req

    try {
        const dto = extractBodyFunction(body)

        return {
            t,
            path,
            params,
            method,
            headers,
            dto,
        }
    } catch (error) {
        console.error(error)
    }
}
