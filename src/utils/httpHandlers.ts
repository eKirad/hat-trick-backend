import { EnforceDocument } from "mongoose";
import { HttpResponse } from "../types/httpResponseType";
import { Response as ExpressResponse } from 'express';

export const httpResponse = <T>(response: ExpressResponse, statusCode: number, data?: EnforceDocument<T, {}>[]): HttpResponse<T> => response.status(statusCode).send({ statusCode, data })