import { HydratedDocument } from "mongoose"

// TODO: Extract
export interface BaseRepositoryOptions {
    populate?: boolean
    lean?: boolean
    excludeFields?: boolean
    projection?: { [key: string]: 0 | 1 }
    select?: boolean
}

export const defaultRepositoryOptions: BaseRepositoryOptions = {
    populate: false,
    lean: false,
    excludeFields: true,
}

export interface BaseRepository {
    findById<T>(id: string, options: BaseRepositoryOptions): Promise<T>
    findOne<T>(data: any, options: BaseRepositoryOptions): Promise<T>
    updateOne(object: HydratedDocument<any>, updateData: any, options: BaseRepositoryOptions): Promise<HydratedDocument<any>>
    softDeleteOne(object: HydratedDocument<any>, options: BaseRepositoryOptions): Promise<HydratedDocument<any>>
}

export interface PopulatedField {
    path: string
    select?: string
}
