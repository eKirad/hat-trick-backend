import { Model as MongooseModel, EnforceDocument } from "mongoose"
import { TFunction } from "i18next"
import { getMongooseCollectionDisplayName } from "../utils"
import HttpError from "../types/httpTypes/httpError"
import { StatusCodes } from "http-status-codes"

interface IRead<M> {
    findAll(): Promise<EnforceDocument<M, {}>[]>
    findOneById(id: string, t: TFunction): Promise<EnforceDocument<M, {}>>
}

interface IWrite<M> {
    create(dto: M): Promise<EnforceDocument<M, {}>>
    updateOneById(id: string, dto: M, t: TFunction): Promise<EnforceDocument<M, {}>>
    delete(id: string): void
}

export class BaseService<M> implements IRead<M>, IWrite<M> {
    constructor(private Model: MongooseModel<M>) {}

    findAll = async (): Promise<any> => await this.Model.find().exec()

    findOneById = async (id: string, t: TFunction): Promise<EnforceDocument<M, {}>> => {
        const model = await this.Model.findById(id).exec()
        if (!model) throw new HttpError(StatusCodes.NOT_FOUND, t("error:not_found", { collection: getMongooseCollectionDisplayName(this.Model.collection.name) }))
        return model
    }

    create = async (dto: M): Promise<EnforceDocument<M, {}>> => await this.Model.create(dto)

    updateOneById = async (id: string, dto: M, t: TFunction): Promise<EnforceDocument<M, {}>> => {
        const model = await this.Model.findByIdAndUpdate(id, dto, { new: true }).exec()
        if (!model) throw new Error(t("error:not_found", { collection: getMongooseCollectionDisplayName(this.Model.collection.name) }))
        return model
    }

    delete = async (id: string): Promise<void> => await this.Model.findByIdAndDelete(id).exec()
}
