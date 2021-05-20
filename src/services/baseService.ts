import mongoose, { Schema, Document, Model, EnforceDocument } from 'mongoose';

interface IBaseService<T> {
    getAllResources(): Promise<EnforceDocument<T, {}>[]>
    getOneResource(): Promise<T>
    createOneResource(): Promise<T>
    updateOneResource(): Promise<T>
    deleteOneResource(): Promise<T>
}

export class BaseService<T> implements IBaseService<T> {
    private Model: Model<T>

    getAllResources = async (): Promise<EnforceDocument<T, {}>[]> => {
        try {
            const model = await this.Model.find().exec()
            return model
        } catch(e) {
            // TODO:
        }
    }

    getOneResource = async () => {
        throw new Error("Method not implemented.");
    }

    createOneResource = async () => {
        throw new Error("Method not implemented.");
    }

    updateOneResource = async () => {
        throw new Error("Method not implemented.");
    }

    deleteOneResource = async () => {
        throw new Error("Method not implemented.");
    }
}