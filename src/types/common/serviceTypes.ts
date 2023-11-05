import { TFunction } from "i18next"

export interface ServiceRead<DTO, DOCUMENT> {
    findAll(): Promise<Array<DTO>>
    findAllDocuments(data: any): Promise<Array<DOCUMENT>>
    findOneById(id: string, t: TFunction): Promise<DTO | null>
    findOneDocumentById(id: string): Promise<DOCUMENT | null>
    findOne(data: any, t: TFunction): Promise<DTO | null>
    findOneDocument(data: any): Promise<DOCUMENT | null>
}

export interface ServiceWrite<DTO, DOCUMENT> {
    createOneAndReturn(dto: DTO): Promise<DTO>
    createOneAndReturnDocument(dto: DTO): Promise<DOCUMENT>
    updateOneByIdAndReturn(id: string, dto: DTO, t: TFunction): Promise<DTO>
    updateOneByIdAndReturnDocument(id: string, dto: DTO): Promise<DOCUMENT>
    deleteOneById(id: string): any
}
