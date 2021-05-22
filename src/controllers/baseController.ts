import { Request, Response, NextFunction } from 'express';
import { BaseService } from '../services/baseService';

interface IGetController {
    getOne(request: Request, response: Response, next: NextFunction): any
    getAll(request: Request, response: Response, next: NextFunction): any
}

interface IModifyController {
    createOne(request: Request, response: Response, next: NextFunction): any
    updateOne(request: Request, response: Response, next: NextFunction): any
    deleteOne(request: Request, response: Response, next: NextFunction): any
}

export class BaseController <M, S extends BaseService<M>> implements IGetController, IModifyController {
    constructor(private service: S) { }

    getAll = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const modelDoc = await this.service.findAll()
            response.status(201).send(modelDoc);
        } catch(e) {
            next(e);
        }
    }

    getOne = async (request: Request, response: Response, next: NextFunction) => {
        throw new Error('Method not implemented.');
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