import { Response } from "express"
import { BaseService } from "../services/baseService"
import { HttpResponse } from "../types"
import { createHttpErrorResponse, createHttpResponse } from "../utils"
import { StatusCodes } from "http-status-codes"
import logger from "../config/logger"
import { BaseRepository } from "../models/repositories/baseRepository"
import { Get, Modify } from "../types/common"
import { HttpRequest } from "../types/httpTypes/httpRequestType"

export class BaseController<T, D, R extends BaseRepository<T, D>, S extends BaseService<T, D, R>> implements Get<T>, Modify<T> {
    constructor(private service: S, private model: any) {}

    public getAll = async ({ t }: HttpRequest<T>, response: Response): Promise<HttpResponse<T>> => {
        try {
            const models = await this.service.findAll()

            return createHttpResponse<T>(response, StatusCodes.OK, models)
        } catch (error) {
            logger.error(`Error ocurred at GET /${this.model.collection.name}: ${error}`)
            throw createHttpErrorResponse(response, StatusCodes.INTERNAL_SERVER_ERROR, t("error:internal_server_error"))
        }
    }

    public getOne = async ({ params, t }: HttpRequest<T>, response: Response): Promise<HttpResponse<T>> => {
        try {
            const id = params.id
            const model = await this.service.findOneById(id, t)

            return createHttpResponse(response, StatusCodes.OK, model)
        } catch (error) {
            logger.error(`Error ocurred at GET /${this.model.collection.name}/${params.id}: ${error}`)
            const errorMessage = error.message || t("error:internal_server_error")
            const errorCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
            throw createHttpErrorResponse(response, errorCode, errorMessage)
        }
    }

    public createOne = async ({ dto, t }: HttpRequest<T>, response: Response): Promise<HttpResponse<T>> => {
        try {
            const model = await this.service.createOne(dto)

            return createHttpResponse(response, StatusCodes.CREATED, model)
        } catch (error) {
            logger.error(`Error ocurred at POST /${this.model.collection.name}: ${error}`)
            throw createHttpErrorResponse(response, StatusCodes.INTERNAL_SERVER_ERROR, t("error:internal_server_error"))
        }
    }

    public updateOne = async ({ params, dto, t }: HttpRequest<T>, response: Response): Promise<HttpResponse<T>> => {
        try {
            const id = params.id
            const model = await this.service.updateOneById(id, dto, t)

            return createHttpResponse(response, StatusCodes.OK, model)
        } catch (error) {
            logger.error(`Error ocurred at PUT /${this.model.collection.name}/${params.id}: ${error}`)
            const errorMessage = error.message || t("error:internal_server_error")
            const errorCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
            throw createHttpErrorResponse(response, errorCode, errorMessage)
        }
    }

    public deleteOne = async ({ params, t }: HttpRequest<T>, response: Response): Promise<HttpResponse<T>> => {
        try {
            const id = params.id
            await this.service.deleteOneById(id)

            return createHttpResponse(response, StatusCodes.OK)
        } catch (error) {
            logger.error(`Error ocurred at DELETE /${this.model.collection.name}/${params.id}: ${error}`)
            throw createHttpErrorResponse(response, StatusCodes.INTERNAL_SERVER_ERROR, t("error:internal_server_error"))
        }
    }
}
