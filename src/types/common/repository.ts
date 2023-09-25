import { TFunction } from "i18next"
import { EnforceDocument } from "mongoose"

export interface RepositoryRead<T> {
    findAll(): Promise<EnforceDocument<T, {}>[]>
    findOneById(id: string, repositoryOptions: RepositoryOptions): Promise<EnforceDocument<T, {}>>
    findOne(data: any, repositoryOptions: RepositoryOptions): Promise<EnforceDocument<T, {}>>
}

export interface RepositoryWrite<T> {
    createOne(dto: T): Promise<EnforceDocument<T, {}>>
    updateOneById(id: string, dto: T): Promise<EnforceDocument<T, {}>>
    deleteOneById(id: string): void
}

export interface RepositoryOptions {
    populate?: boolean
    lean?: boolean
    excludeFields?: boolean
    projection?: { [key: string]: 0 | 1 }
    select?: boolean
}

export interface PopulatedFields {
    path: string
    select?: string
}
