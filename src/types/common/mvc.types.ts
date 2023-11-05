import { Response, NextFunction } from "express"
import { HttpResponse } from "../httpTypes"
import { HttpRequest } from "../httpTypes/httpRequest.type"
import { Document, Require_id } from "mongoose"
import { TFunction } from "i18next"

export interface Get<T> {
    getOne(request: HttpRequest<T>, response: Response, next: NextFunction): Promise<HttpResponse<T>>
    getAll(request: HttpRequest<T>, response: Response, next: NextFunction): Promise<HttpResponse<T>>
}

export interface Modify<T> {
    createOne(request: HttpRequest<T>, response: Response, next: NextFunction): Promise<HttpResponse<T>>
    updateOne(request: HttpRequest<T>, response: Response, next: NextFunction): Promise<HttpResponse<T>>
    deleteOne(request: HttpRequest<T>, response: Response, next: NextFunction): Promise<HttpResponse<T>>
}

export interface ServiceRead<T, D> {
    findAll(): Promise<T[]>
    findOneById(id: string, t: TFunction): Promise<T | null>
    findOne(data: any, t: TFunction): Promise<T | null>
    findOneDocument(data: any): Promise<D | null>
    findOneDocumentById(id: string): Promise<D | null>
}

export interface ServiceWrite<T> {
    createOne(dto: T): Promise<any>
    updateOneById(id: string, dto: T, t: TFunction): Promise<T>
    deleteOneById(id: string): any
}

export interface ServiceQueryOptions {
    shouldConvertToDTO: boolean
}

export interface RepositoryRead<D> {
    findAll(repositoryOptions: RepositoryOptions): Promise<Document<any, any, D>[]>
    findOneById(id: string, repositoryOptions: RepositoryOptions): Promise<D | undefined>
    findOne(data: any, repositoryOptions: RepositoryOptions): Promise<D | undefined>
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
