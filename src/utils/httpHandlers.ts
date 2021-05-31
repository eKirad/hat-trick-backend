import { EnforceDocument } from "mongoose";
import { HttpResponse } from "../types";
import { Response as ExpressResponse } from 'express';
import { StatusCodes } from 'http-status-codes';

export const httpResponse = <T> (
    response: ExpressResponse, 
    statusCode: StatusCodes, 
    data?: EnforceDocument<T, {}> | EnforceDocument<T, {}>[] | string
): HttpResponse<T> => response.status(statusCode).send({ statusCode, data })