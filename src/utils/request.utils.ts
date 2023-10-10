import { CustomExpressRequest, HttpRequest } from "../types/httpTypes/httpRequest.type"

export const parseHttpRequest = <T>(req: CustomExpressRequest, extractBodyFunction?: (requestBody: any) => T): HttpRequest<T> => {
    const { t, path, params, method, headers, body, authSecret } = req

    try {
        return {
            t,
            path,
            params,
            method,
            headers,
            authSecret,
            ...(extractBodyFunction && { dto: extractBodyFunction(body) }),
        }
    } catch (error) {
        console.error(error)
    }
}
