import { TFunction } from "i18next"

export interface ServiceRead<DTO, DOCUMENT> {
    findAll(): Promise<Array<DTO>>
    findOneById(id: string, t: TFunction): Promise<DTO | null>
    findOneDocumentById(id: string): Promise<DOCUMENT | null>
    findOne(data: any, t: TFunction): Promise<DTO | null>
    findOneDocument(data: any): Promise<DOCUMENT | null>
}

export interface ServiceWrite<DTO> {
    createOne(dto: DTO): Promise<any>
    updateOneById(id: string, dto: DTO, t: TFunction): Promise<DTO>
    deleteOneById(id: string): any
}
