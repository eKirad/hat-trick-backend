import { Request, Response, NextFunction } from 'express';
import { BaseService } from '../services/baseService';
import { HttpResponse } from '../types';
import { createHttpErrorResponse, createHttpResponse } from '../utils';
import { StatusCodes } from 'http-status-codes';
import logger from '../config/logger';

interface IGet<M> {
    getOne(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
    getAll(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
}

interface IModify<M> {
    createOne(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
    updateOne(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
    deleteOne(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
}

export class BaseController <M, S extends BaseService<M>> implements IGet<M>, IModify<M> {
    constructor(private service: S, private model: any) { }

    extractRequestBody = (requestBody: any) => requestBody;

    getAll = async ({ t }: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>> => {
        try {
            const models = await this.service.findAll();
            return createHttpResponse<M>(response, StatusCodes.OK, models);
        } catch(e) {
            next(e);
            logger.error(`Error occured at GET /${this.model.collection.name}: ${e}`)
            throw createHttpErrorResponse(response, StatusCodes.INTERNAL_SERVER_ERROR, t("error:internal_server_error"));
        }
    }

    getOne = async ({ params, t }: Request, response: Response, next: NextFunction) => {
        try {
            const id = params.id;
            const model = await this.service.findOneById(id, t);
            return createHttpResponse(response, StatusCodes.OK, model);
        } catch(e) {
            next(e);
            logger.error(`Error occured at GET /${this.model.collection.name}/${params.id}: ${e}`)
            const errorMessage = e.message || t("error:internal_server_error");
            const errorCode = e.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
            throw createHttpErrorResponse(response, errorCode, errorMessage);
        }
    }

    createOne = async ({ body, t }: Request, response: Response, next: NextFunction) => {
        try {
            const dto = this.extractRequestBody(body);
            const model = await this.service.create(dto);
            return createHttpResponse(response, StatusCodes.CREATED, model);
        } catch(e) {
            next(e);
            logger.error(`Error occured at POST /${this.model.collection.name}: ${e}`)
            throw createHttpErrorResponse(response, StatusCodes.INTERNAL_SERVER_ERROR, t("error:internal_server_error"))
        }
    }

    updateOne = async ({ params, body, t }: Request, response: Response, next: NextFunction) => {
        try {
            const id = params.id;
            const dto = this.extractRequestBody(body);
            const model = await this.service.updateOneById(id, dto, t);
            return createHttpResponse(response, StatusCodes.OK, model);
        } catch(e) {
            next(e);
            logger.error(`Error occured at PUT /${this.model.collection.name}/${params.id}: ${e}`)
            const errorMessage = e.message || t("error:internal_server_error");
            const errorCode = e.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
            throw createHttpErrorResponse(response, errorCode, errorMessage)
        }
    }

    deleteOne = async ({ params, t}: Request, response: Response, next: NextFunction) => {
        try {
            const id = params.id;
            await this.service.delete(id);
            return createHttpResponse(response, StatusCodes.OK);
        } catch(e) {
            logger.error(`Error occured at DELETE /${this.model.collection.name}/${params.id}: ${e}`)
            next(e);
            throw createHttpErrorResponse(response, StatusCodes.INTERNAL_SERVER_ERROR, t("error:internal_server_error"))
        }
    }
}