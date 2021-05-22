import { EnforceDocument } from 'mongoose';
export type HttpResponse<T> = {
    statusCode: number
    data?: EnforceDocument<T, {}> | EnforceDocument<T, {}>[]
}