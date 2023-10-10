import { HttpRequest } from "../types/httpTypes/httpRequest.type"
import { ExpressRequestWithAuthSecret } from "../middlewares/authSecretMiddleware"

export const parseHttpRequest = <T>(req: ExpressRequestWithAuthSecret, extractBodyFunction?: (requestBody: any) => T): HttpRequest<T> => {
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
