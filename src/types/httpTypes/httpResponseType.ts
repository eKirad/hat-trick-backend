import { StatusCodes } from "http-status-codes"

export type HttpResponse<T> = {
    statusCode: StatusCodes
    data?: T[]
}
