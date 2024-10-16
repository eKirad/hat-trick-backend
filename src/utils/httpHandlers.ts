import { HttpErrorResponse, HttpResponse } from "../types"
import { Response as ExpressResponse } from "express"
import { StatusCodes } from "http-status-codes"
import { ValidationError } from "express-validator"

export const createHttpResponse = <T>(response: ExpressResponse, statusCode: StatusCodes, data?: T | T[]): HttpResponse<T> => response.status(statusCode).send({ statusCode, data })

export const createHttpErrorResponse = (response: ExpressResponse, statusCode: StatusCodes, errorMessage?: string | ValidationError[]): HttpErrorResponse =>
    response.status(statusCode).send({ statusCode, errorMessage })

export const createHttpError = (statusCode: StatusCodes, errorMessage?: string): HttpErrorResponse => ({ statusCode, errorMessage })
