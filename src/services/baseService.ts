import { Document, Require_id } from "mongoose"
import { getMongooseCollectionDisplayName } from "../utils"
import { StatusCodes } from "http-status-codes"
import { BaseRepository } from "../models/repositories/baseRepository"
import { TFunction } from "i18next"
import { ServiceRead, ServiceWrite } from "../types/common"
import HttpError from "../types/httpTypes/httpError"
import { ServiceQueryOptions } from "../types/common/service"
import { defaultServiceOptions } from "../shared/consts"

export class BaseService<T, D, R extends BaseRepository<T, D>> implements ServiceRead<T, D>, ServiceWrite<T> {
    constructor(private repository: R, private model: any) {}

    modelToDTO = (model: Document<any, any, D> | Require_id<D>): T => ({} as T)
    modelsToDTOs = (model: Document<any, any, D>[]): T[] => ({} as T[])

    public findAll = async (): Promise<T[]> => {
        const models = await this.repository.findAll()

        const dtos = this.modelsToDTOs(models)

        return dtos
    }

    public findOneById = async (id: string, t: TFunction): Promise<T | null> => {
        const model = await this.repository.findOneById(id)

        if (!model) throw new HttpError(StatusCodes.NOT_FOUND, t("error:not_found", { collection: this.model.collection.name }), this.model.collection.name)

        const dto = this.modelToDTO(model)

        return dto
    }

    public findOne = async (
        data: any,
        t: TFunction,
        serviceQueryOptions: ServiceQueryOptions = defaultServiceOptions
    ): Promise<T | Document<any, any, D> | Require_id<D> | null> => {
        const model = await this.repository.findOne(data)

        if (!model) throw new HttpError(StatusCodes.NOT_FOUND, t("error:not_found", { collection: this.model.collection.name }), this.model.collection.name)

        const response = serviceQueryOptions.shouldConvertToDTO ? this.modelToDTO(model) : model

        return response
    }

    public createOne = async (dto: T): Promise<any> => {
        const model = await this.repository.createOne(dto)

        const createdDTO = this.modelToDTO(model)

        return createdDTO
    }

    public updateOneById = async (id: string, dto: T, t: TFunction): Promise<T> => {
        const updateModel = await this.repository.updateOneById(id, dto)

        // TODO: Fix collection name
        if (!updateModel) throw new Error(t("error:not_found", { collection: getMongooseCollectionDisplayName(`TODO`) }))

        const updatedDTO = this.modelToDTO(updateModel)

        return updatedDTO
    }

    public deleteOneById = async (id: string): Promise<any> => this.repository.deleteOneById(id)
}
