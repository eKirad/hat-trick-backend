import { Document, Require_id } from "mongoose"

export interface RepositoryRead<D> {
    findAll(): Promise<Document<any, any, D>[]>
    findOneById(id: string, repositoryOptions: RepositoryOptions): Promise<Document<any, any, D> | Require_id<D> | undefined>
    findOne(data: any, repositoryOptions: RepositoryOptions): Promise<Document<any, any, D> | Require_id<D> | undefined>
}

export interface RepositoryWrite<T, D> {
    createOne(dto: T, repositoryOptions: RepositoryOptions): Promise<Document<any, any, D>>
    updateOneById(id: string, dto: T): Promise<Document<any, any, D>>
    deleteOneById(id: string): Promise<any>
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
