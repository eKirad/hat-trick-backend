import { EnforceDocument } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

export type HttpResponse<T> = {
    statusCode: StatusCodes
    data?: EnforceDocument<T, {}> | EnforceDocument<T, {}>[]
}