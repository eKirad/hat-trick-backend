import { TFunction } from "i18next"

export interface ServiceRead<T> {
    findAll(): Promise<T[]>
    findOneById(id: string, t: TFunction): Promise<T | null>
    findOne(data: any, t: TFunction): Promise<T | null>
}

export interface ServiceWrite<T> {
    createOne(dto: T): Promise<any>
    updateOneById(id: string, dto: T, t: TFunction): Promise<T>
    deleteOneById(id: string): any
}
