import { StatusCodes } from "http-status-codes"

export default class HttpError extends Error {
    public statusCode: StatusCodes
    public collectionName?: string
    constructor(statusCode: StatusCodes, message?: string, collectionName?: string) {
        super(message)
        this.statusCode = statusCode
        this.collectionName = collectionName
    }
}
