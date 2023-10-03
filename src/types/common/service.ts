import { TFunction } from "i18next"
import { Document, Require_id } from "mongoose"

export interface ServiceRead<T, D> {
    findAll(): Promise<T[]>
    findOneById(id: string, t: TFunction): Promise<T | null>
    findOne(data: any, t: TFunction, serviceQueryOptions: ServiceQueryOptions): Promise<T | Document<any, any, D> | Require_id<D> | null>
}

export interface ServiceWrite<T> {
    createOne(dto: T): Promise<any>
    updateOneById(id: string, dto: T, t: TFunction): Promise<T>
    deleteOneById(id: string): any
}

export interface ServiceQueryOptions {
    shouldConvertToDTO: boolean
}
