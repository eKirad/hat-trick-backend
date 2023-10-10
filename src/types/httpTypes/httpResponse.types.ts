import { StatusCodes } from "http-status-codes"

export type HttpErrorResponse = {
    statusCode: StatusCodes
    errorMessage?: string
}

export type HttpResponse<T> = {
    statusCode: StatusCodes
    data?: T[]
}
