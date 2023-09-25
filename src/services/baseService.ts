import { getMongooseCollectionDisplayName } from "../utils"
import { StatusCodes } from "http-status-codes"
import { BaseRepository } from "../models/repositories/baseRepository"
import { TFunction } from "i18next"
import { EnforceDocument } from "mongoose"
import { ServiceRead, ServiceWrite } from "../types/common"
import HttpError from "../types/httpTypes/httpError"

export class BaseService<M, R extends BaseRepository<M>> implements ServiceRead<M>, ServiceWrite<M> {
    constructor(private repository: R) {}

    extractRequestBody = (requestBody: any) => requestBody

    findAll = async (): Promise<EnforceDocument<M, {}>[]> => await this.repository.findAll()

    findOneById = async (id: string, t: TFunction): Promise<EnforceDocument<M, {}>> => {
        const model = await this.repository.findOneById(id)
        // TODO: Fix collection name
        if (!model) throw new HttpError(StatusCodes.NOT_FOUND, t("error:not_found", { collection: `TODO` }))

        return model
    }

    findOne = async (data: any, t: TFunction): Promise<EnforceDocument<M, {}>> => {
        const model = await this.repository.findOne(data)

        // TODO: Fix collection name
        if (!model) throw new HttpError(StatusCodes.NOT_FOUND, t("error:not_found", { collection: `TODO` }))

        return model
    }

    createOne = async (dto: M): Promise<EnforceDocument<M, {}>> => await this.repository.createOne(dto)

    updateOneById = async (id: string, dto: M, t: TFunction): Promise<EnforceDocument<M, {}>> => {
        const updateModel = await this.repository.updateOneById(id, dto)

        // TODO: Fix collection name
        if (!updateModel) throw new Error(t("error:not_found", { collection: getMongooseCollectionDisplayName(`TODO`) }))

        return updateModel
    }

    deleteOneById = async (id: string): Promise<void> => this.repository.deleteOneById(id)
}
