import { Model as MongooseModel, EnforceDocument } from 'mongoose';

interface IRead<M> {
    findAll(): Promise<EnforceDocument<M, {}>[]>
    findOne(id: string): Promise<EnforceDocument<M, {}>>
}

interface IWrite<M> {
    create(dto: M): Promise<EnforceDocument<M, {}>>
    update(id: string, dto: M): Promise<EnforceDocument<M, {}>>
    delete(id: string): void
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
            const model = await this.Model.findById(id).exec();
            return model;
        } catch(e) {
            // TODO:
        }
    }
    
    create = async(dto: M): Promise<EnforceDocument<M, {}>> => {
        try {
            const model = await this.Model.create(dto);
            return model;
        } catch(e) {
            // TODO:
        }
    }

    update = async(id: string, dto: M): Promise<EnforceDocument<M, {}>> => {
        try {
            const model = await this.Model.findByIdAndUpdate(id, dto, {new: true}).exec();
            return model;
        } catch(e) {
            // TODO:
        }
    }
    
    delete = async(id: string): Promise<void> => {
        try {
            await this.Model.findByIdAndDelete(id).exec();
        } catch(e) {
            // TODO:
        }
    }
}