import { Request, Response, NextFunction } from 'express';
import { BaseService } from '../services/baseService';
import mongoose, { Schema, Document, Model, EnforceDocument } from 'mongoose';

interface IBaseController {
    getAllResources(request: Request, response: Response, next: NextFunction): any
    getOneResource(request: Request, response: Response, next: NextFunction): any
    createOneResource(request: Request, response: Response, next: NextFunction): any
    updateOneResource(request: Request, response: Response, next: NextFunction): any
    deleteOneResource(request: Request, response: Response, next: NextFunction): any
}


export abstract class BaseController<T> implements IBaseController {
    private Model: Model<T>

    private extractRequestData = (requestBody: any) => {

    }

// TODO:
    getAllResources = async (request: Request, response: Response, next: NextFunction) => { 
        try {
            // const baseDoc = await new BaseService().getAllResources()
            const model = await this.Model.find().exec()
            response.status(201).send(model);
        } catch(e) {
            next(e);
        }
    }

    constructor(Model: any) {
        this.Model = Model;
    }

    getOneResource = async (request: Request, response: Response, next: NextFunction) => { 
        try {

        } catch(e) {
            next(e);
        }
    }

    createOneResource = async (request: Request, response: Response, next: NextFunction) => { 
        try {

        } catch(e) {
            next(e);
        }
    }

    updateOneResource = async (request: Request, response: Response, next: NextFunction) => { 
        try {

        } catch(e) {
            next(e);
        }
    }

    deleteOneResource = async (request: Request, response: Response, next: NextFunction) => { 
        try {

        } catch(e) {
            next(e);
        }
    }
}