import { Response } from "express"
import { BaseService } from "../services/baseService"
import { HttpResponse } from "../types"
import { createHttpErrorResponse, createHttpResponse } from "../utils"
import { StatusCodes } from "http-status-codes"
import logger from "../config/logger"
import { BaseRepository } from "../models/repositories/baseRepository"
import { Get, Modify } from "../types/common"
import { HttpRequest } from "../types/httpTypes/httpRequestType"
import HttpError from "../types/httpTypes/httpError"
import { TFunction } from "i18next"

export class BaseController<T, D, R extends BaseRepository<T, D>, S extends BaseService<T, D, R>> implements Get<T>, Modify<T> {
    constructor(private service: S) {}

    private extractError = (error: HttpError, t: TFunction, pathParams?: any) => {
        const errorMessage = error.message || t("error:internal_server_error")
        const errorCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        logger.error(`Error ocurred at GET /${error?.collectionName}/${pathParams.id} with status ${errorCode}`)

        return { errorMessage, errorCode }
    }

    public getAll = async ({ t }: HttpRequest<T>, response: Response): Promise<HttpResponse<T>> => {
        try {
            const models = await this.service.findAll()

            return createHttpResponse<T>(response, StatusCodes.OK, models)
        } catch (error) {
            const { errorMessage, errorCode } = this.extractError(error, t)
            throw createHttpErrorResponse(response, errorCode, errorMessage)
        }
    }

    public getOne = async ({ params, t }: HttpRequest<T>, response: Response): Promise<HttpResponse<T>> => {
        try {
            const id = params.id
            const model = await this.service.findOneById(id, t)

            return createHttpResponse(response, StatusCodes.OK, model)
        } catch (error) {
            const { errorMessage, errorCode } = this.extractError(error, t, params)
            throw createHttpErrorResponse(response, errorCode, errorMessage)
        }
    }

    public createOne = async ({ dto, t }: HttpRequest<T>, response: Response): Promise<HttpResponse<T>> => {
        try {
            const model = await this.service.createOne(dto)

            return createHttpResponse(response, StatusCodes.CREATED, model)
        } catch (error) {
            const { errorMessage, errorCode } = this.extractError(error, t)
            throw createHttpErrorResponse(response, errorCode, errorMessage)
        }
    }

    public updateOne = async ({ params, dto, t }: HttpRequest<T>, response: Response): Promise<HttpResponse<T>> => {
        try {
            const id = params.id
            const model = await this.service.updateOneById(id, dto, t)

            return createHttpResponse(response, StatusCodes.OK, model)
        } catch (error) {
            const { errorMessage, errorCode } = this.extractError(error, t)
            throw createHttpErrorResponse(response, errorCode, errorMessage)
        }
    }

    public deleteOne = async ({ params, t }: HttpRequest<T>, response: Response): Promise<HttpResponse<T>> => {
        try {
            const id = params.id
            await this.service.deleteOneById(id)

            return createHttpResponse(response, StatusCodes.OK)
        } catch (error) {
            const { errorMessage, errorCode } = this.extractError(error, t)
            throw createHttpErrorResponse(response, errorCode, errorMessage)
        }
    }
}
