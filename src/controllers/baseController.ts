import { Response } from "express"
import { BaseService } from "../services/baseService"
import { HttpResponse } from "../types"
import { createHttpResponse } from "../utils"
import { StatusCodes } from "http-status-codes"
import logger from "../config/logger/winstonLogger"
import { BaseRepository } from "../models/repositories/baseRepository"
import { Get, Modify } from "../types"
import { HttpRequest } from "../types/httpTypes/httpRequest.type"
import HttpError from "../types/httpTypes/httpError.type"
import { createHttpError } from "../utils/httpHandlers"

export class BaseController<T, D, R extends BaseRepository<T, D>, S extends BaseService<T, D, R>> implements Get<T>, Modify<T> {
    constructor(private service: S) {}

    private extractError = (error: HttpError, { params, method, t }: Pick<HttpRequest<T>, "method" | "params" | "t">) => {
        const errorMessage = error.message || t("error:internal_server_error")
        const errorCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        logger.error(`Error ocurred at ${method}: ${error?.collectionName}/${params?.id} with status ${errorCode}`)

        return { errorMessage, errorCode }
    }

    public getAll = async ({ params, method, t }: HttpRequest<T>, response: Response): Promise<HttpResponse<T>> => {
        try {
            const models = await this.service.findAll()

            return createHttpResponse<T>(response, StatusCodes.OK, models)
        } catch (error) {
            const { errorMessage, errorCode } = this.extractError(error, { params, method, t })
            throw createHttpError(errorCode, errorMessage)
        }
    }

    public getOne = async ({ params, method, t }: HttpRequest<T>, response: Response): Promise<HttpResponse<T>> => {
        try {
            const id = params.id
            const model = await this.service.findOneById(id, t)

            return createHttpResponse(response, StatusCodes.OK, model)
        } catch (error) {
            const { errorMessage, errorCode } = this.extractError(error, { params, method, t })
            throw createHttpError(errorCode, errorMessage)
        }
    }

    public createOne = async ({ dto, params, method, t }: HttpRequest<T>, response: Response): Promise<HttpResponse<T>> => {
        try {
            const createdModelDto = await this.service.createOneAndReturn(dto)

            return createHttpResponse(response, StatusCodes.CREATED, createdModelDto)
        } catch (error) {
            const { errorMessage, errorCode } = this.extractError(error, { params, method, t })
            throw createHttpError(errorCode, errorMessage)
        }
    }

    public updateOne = async ({ dto, params, method, t }: HttpRequest<T>, response: Response): Promise<HttpResponse<T>> => {
        try {
            const id = params.id
            const model = await this.service.updateOneByIdAndReturn(id, dto, t)

            return createHttpResponse(response, StatusCodes.OK, model)
        } catch (error) {
            const { errorMessage, errorCode } = this.extractError(error, { params, method, t })
            throw createHttpError(errorCode, errorMessage)
        }
    }

    public deleteOne = async ({ params, method, t }: HttpRequest<T>, response: Response): Promise<HttpResponse<T>> => {
        try {
            const id = params.id
            await this.service.deleteOneById(id)

            return createHttpResponse(response, StatusCodes.OK)
        } catch (error) {
            const { errorMessage, errorCode } = this.extractError(error, { params, method, t })
            throw createHttpError(errorCode, errorMessage)
        }
    }
}
