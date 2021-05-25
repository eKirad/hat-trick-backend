import { Request, Response, NextFunction } from 'express';
import { BaseService } from '../services/baseService';
import { HttpResponse } from '../types/httpResponseType';
import { httpResponse } from '../utils/httpHandlers';
import { StatusCodes } from 'http-status-codes';

interface IGet<M> {
    getOne(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
    getAll(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
}

interface IModify<M> {
    createOne(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
    updateOne(request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>>
    deleteOne(request: Request, response: Response, next: NextFunction): any
}

export class BaseController <M, S extends BaseService<M>> implements IGet<M>, IModify<M> {
    constructor(private service: S) { }

    getAll = async (request: Request, response: Response, next: NextFunction): Promise<HttpResponse<M>> => {
        try {
            const modelDoc = await this.service.findAll()
            return httpResponse(response, StatusCodes.OK, modelDoc)
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
        throw new Error('Method not implemented.');
    }

    updateOne = async (request: Request, response: Response, next: NextFunction) => {
        throw new Error('Method not implemented.');
    }

    deleteOne = async (request: Request, response: Response, next: NextFunction) => {
        throw new Error('Method not implemented.');
    }
}