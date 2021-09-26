import { StatusCodes } from 'http-status-codes';

export default class HttpError extends Error {
    public statusCode: StatusCodes;
    constructor(statusCode: StatusCodes, message?: string) {
        super(message);
        this.statusCode = statusCode;
    }
}