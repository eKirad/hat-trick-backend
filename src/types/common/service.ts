import { TFunction } from "i18next"
import { EnforceDocument } from "mongoose"

export interface ServiceRead<T> {
    findAll(): Promise<EnforceDocument<T, {}>[]>
    findOneById(id: string, t: TFunction): Promise<EnforceDocument<T, {}>>
    findOne(data: any, t: TFunction): Promise<EnforceDocument<T, {}>>
}

export interface ServiceWrite<T> {
    createOne(dto: T): Promise<EnforceDocument<T, {}>>
    updateOneById(id: string, dto: T, t: TFunction): Promise<EnforceDocument<T, {}>>
    deleteOneById(id: string): void
}
