import { EnforceDocument } from "mongoose";
import { HttpResponse } from "../types/httpResponseType";
import { Response as ExpressResponse } from 'express';
import { StatusCodes } from 'http-status-codes';

export const httpResponse = <T> (
    response: ExpressResponse, 
    statusCode: StatusCodes, 
    data?: EnforceDocument<T, {}> | EnforceDocument<T, {}>[]
): HttpResponse<T> => response.status(statusCode).send({ statusCode, data })