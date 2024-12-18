import { getMongooseCollectionDisplayName } from "../utils"
import { StatusCodes } from "http-status-codes"
import { BaseRepository } from "../models/repositories/baseRepository"
import { TFunction } from "i18next"
import { ServiceRead, ServiceWrite } from "../types"
import HttpError from "../types/httpTypes/httpError.type"

export abstract class BaseService<DTO, DOCUMENT, REPOSITORY extends BaseRepository<DTO, DOCUMENT>> implements ServiceRead<DTO, DOCUMENT>, ServiceWrite<DTO, DOCUMENT> {
    constructor(private repository: REPOSITORY, private model: any) {}

    abstract modelToDTO(model: DOCUMENT): DTO
    abstract modelsToDTOs(model: Array<DOCUMENT>): Array<DTO>

    private throwError = (statusCode: StatusCodes, t: TFunction) => {
        const collection = getMongooseCollectionDisplayName(this.model.collection.name)
        throw new HttpError(statusCode, t("error:not_found", { collection }), this.model.collection.name)
    }

    public findAll = async (): Promise<Array<DTO>> => {
        const models = await this.findAllDocuments()

        const dtos = this.modelsToDTOs(models)

        return dtos
    }

    public findAllDocuments = async (): Promise<Array<DOCUMENT>> => {
        const models = await this.repository.findAll()

        return models
    }

    public findOneById = async (id: string, t: TFunction): Promise<DTO | null> => {
        const model = await this.findOneDocumentById(id)

        if (!model) this.throwError(StatusCodes.NOT_FOUND, t)

        const dto = this.modelToDTO(model)

        return dto
    }

    public findOneDocumentById = async (id: string): Promise<DOCUMENT | null> => {
        const model = await this.repository.findOneById(id)

        return model
    }

    public findOne = async (data: any, t?: TFunction): Promise<DTO | null> => {
        const model = await this.findOneDocument(data)

        if (!model) this.throwError(StatusCodes.NOT_FOUND, t)

        const response = this.modelToDTO(model)

        return response
    }

    public findOneDocument = async (data: any): Promise<DOCUMENT | null> => {
        const model = await this.repository.findOne(data)

        return model
    }

    public createOneAndReturn = async (dto: DTO): Promise<DTO> => {
        const model = await this.createOneAndReturnDocument(dto)

        const createdDTO = this.modelToDTO(model)

        return createdDTO
    }

    public createOneAndReturnDocument = async (dto: DTO): Promise<DOCUMENT> => {
        const model = await this.repository.createOne(dto)

        return model
    }

    public updateOneByIdAndReturn = async (id: string, dto: DTO, t: TFunction): Promise<DTO> => {
        const updateModel = await this.updateOneByIdAndReturnDocument(id, dto)

        if (!updateModel) this.throwError(StatusCodes.NOT_FOUND, t)

        const updatedDTO = this.modelToDTO(updateModel)

        return updatedDTO
    }

    public updateOneByIdAndReturnDocument = async (id: string, dto: DTO): Promise<DOCUMENT> => {
        const updateModel = await this.repository.updateOneById(id, dto)

        return updateModel
    }

    public deleteOneById = async (id: string): Promise<any> => this.repository.deleteOneById(id)

    public createMany = async (dtos: Array<DTO>): Promise<any> => {
        const models = await this.repository.createMany(dtos)

        const createdDTOs = this.modelsToDTOs(models)

        return createdDTOs
    }
}
