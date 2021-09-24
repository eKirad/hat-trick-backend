import { Request, Response, NextFunction } from 'express';
import { BaseService } from '../services/baseService';
import { HttpResponse } from '../types';
import { createHttpErrorResponse, createHttpResponse, getMongooseCollectionDisplayName } from '../utils';
import { StatusCodes } from 'http-status-codes';

interface IGet<M> {
    getOne(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
    getAll(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
}

interface IModify<M> {
    createOne(request: Request, response: Response, next: NextFunction): void
    updateOne(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
    deleteOne(request: Request, response: Response, next: NextFunction): any
}

export class BaseController <M, S extends BaseService<M>> implements IGet<M>, IModify<M> {
    constructor(private service: S, private model: any) { }

    extractRequestBody = (requestBody: any) => requestBody;

    getAll = async ({ t }: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>> => {
        try {
            const models = await this.service.findAll()
            return createHttpResponse<M>(response, StatusCodes.OK, models)
        } catch(e) {
            // TODO: Add logger
            throw createHttpErrorResponse(response, StatusCodes.INTERNAL_SERVER_ERROR, t("error:internal_server_error"))
        }
    }

    getOne = async ({ params, t }: Request, response: Response, next: NextFunction) => {
        try {
            const id = params.id;
            const model = await this.service.findOne(id);
            if (!model) throw createHttpErrorResponse(response, StatusCodes.NOT_FOUND, t("error:not_found", { collection: getMongooseCollectionDisplayName(this.model.collection.name) }))
            return createHttpResponse(response, StatusCodes.OK, model);
        } catch(e) {
            // TODO: Add logger
            throw createHttpErrorResponse(response, StatusCodes.INTERNAL_SERVER_ERROR, t("error:internal_server_error"))
        }
    }

    createOne = async ({ body, t }: Request, response: Response, next: NextFunction) => {
        try {
            const dto = this.extractRequestBody(body);
            const model = await this.service.create(dto);
            return createHttpResponse(response, StatusCodes.CREATED, model);
        } catch(e) {
            // TODO: Add logger
            throw createHttpErrorResponse(response, StatusCodes.INTERNAL_SERVER_ERROR, t("error:internal_server_error"))
        }
    }

    updateOne = async ({ params, body, t }: Request, response: Response, next: NextFunction) => {
        try {
            const id = params.id;
            const dto = this.extractRequestBody(body);
            const model = await this.service.update(id, dto); // TODO: Change with .findByIdAndUpdate()
            return createHttpResponse(response, StatusCodes.OK, model);
        } catch(e) {
            // TODO: Add logger
            throw createHttpErrorResponse(response, StatusCodes.INTERNAL_SERVER_ERROR, t("error:internal_server_error"))
        }
    }

    deleteOne = async ({ params, t}: Request, response: Response, next: NextFunction) => {
        try {
            const id = params.id;
            await this.service.delete(id);
            return createHttpResponse(response, StatusCodes.OK);
        } catch(e) {
            // TODO: Add logger
            throw createHttpErrorResponse(response, StatusCodes.INTERNAL_SERVER_ERROR, t("error:internal_server_error"))
        }
    }
}