import { Document, Require_id } from "mongoose"
import { getMongooseCollectionDisplayName } from "../utils"
import { StatusCodes } from "http-status-codes"
import { BaseRepository } from "../models/repositories/baseRepository"
import { TFunction } from "i18next"
import { ServiceRead, ServiceWrite } from "../types/common"
import HttpError from "../types/httpTypes/httpError"

export class BaseService<T, D, R extends BaseRepository<T, D>> implements ServiceRead<T>, ServiceWrite<T> {
    constructor(private repository: R) {}

    modelToDTO = (model: Document<any, any, D> | Require_id<D>): T => ({} as T)
    modelsToDTOs = (model: Document<any, any, D>[]): T[] => ({} as T[])

    public findAll = async (): Promise<T[]> => {
        const models = await this.repository.findAll()

        const dtos = this.modelsToDTOs(models)

        return dtos
    }

    public findOneById = async (id: string, t: TFunction): Promise<T | null> => {
        const model = await this.repository.findOneById(id)
        // TODO: Fix collection name
        if (!model) throw new HttpError(StatusCodes.NOT_FOUND, t("error:not_found", { collection: `TODO` }))

        const dto = this.modelToDTO(model)

        return dto
    }

    public findOne = async (data: any, t: TFunction): Promise<T | null> => {
        const model = await this.repository.findOne(data)

        // TODO: Fix collection name
        if (!model) throw new HttpError(StatusCodes.NOT_FOUND, t("error:not_found", { collection: `TODO` }))

        const dto = this.modelToDTO(model)

        return dto
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
