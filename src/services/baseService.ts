import { Model as MongooseModel, EnforceDocument } from 'mongoose';

interface IRead<M> {
    findAll(): Promise<EnforceDocument<M, {}>[]>
    findOne(id: string): Promise<EnforceDocument<M, {}>>
}

interface IWrite<M> {
    create(): Promise<EnforceDocument<M, {}>>
    update(): Promise<EnforceDocument<M, {}>>
    delete(): Promise<EnforceDocument<M, {}>>
}

export class BaseService<M> implements IRead<M>, IWrite<M> {

    constructor(private Model: MongooseModel<M>) { }

    findAll = async(): Promise<EnforceDocument<M, {}>[]> => {
        try {
            const model = await this.Model.find().exec()
            return model;
        } catch(e) {
            // TODO:
        }
    }

    findOne = async(id: string): Promise<EnforceDocument<M, {}>> => {
        try {
            const model = await this.Model.findById(id).exec()
            return model;
        } catch(e) {
            // TODO:
        }
    }
    
    create = async(): Promise<EnforceDocument<M, {}>> => {
        throw new Error('Method not implemented.');
    }

    update = async(): Promise<EnforceDocument<M, {}>> => {
        throw new Error('Method not implemented.');
    }
    
    delete = async(): Promise<EnforceDocument<M, {}>> => {
        throw new Error('Method not implemented.');
    }
}