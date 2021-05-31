import { Request, Response, NextFunction } from 'express';
import { BaseService } from '../services/baseService';
import { HttpResponse } from '../types';
import { httpResponse } from '../utils';
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
    constructor(private service: S) { }
    
    extractRequestBody = (requestBody: any) => requestBody;

    getAll = async (request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>> => {
        try {
            const model = await this.service.findAll()
            return httpResponse<M>(response, StatusCodes.OK, model)
        } catch(e) {
            next(e);
        }
    }

    getOne = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const id = request.params.id;
            const model = await this.service.findOne(id);
            return httpResponse(response, StatusCodes.OK, model);
        } catch(e) {
            next(e);
        }
    }

    createOne = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const dto = this.extractRequestBody(request.body);
            const model = await this.service.create(dto);
            return httpResponse(response, StatusCodes.CREATED, model);
        } catch(e) {
            next(e);
        }
    }

    updateOne = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const id = request.params.id;
            const dto = this.extractRequestBody(request.body);
            const model = await this.service.update(id, dto);
            return httpResponse(response, StatusCodes.OK, model);
        } catch(e) {
            next(e);
        }
    }

    deleteOne = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const id = request.params.id;
            await this.service.delete(id);
            return httpResponse(response, StatusCodes.OK);
        } catch(e) {
            next(e);
        }
    }
}