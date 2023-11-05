export interface ServiceQueryOptions {
    shouldConvertToDTO: boolean
}

export interface RepositoryRead<DOCUMENT> {
    findAll(repositoryOptions: RepositoryOptions): Promise<Array<DOCUMENT>>
    findOneById(id: string, repositoryOptions: RepositoryOptions): Promise<DOCUMENT | undefined>
    findOne(data: any, repositoryOptions: RepositoryOptions): Promise<DOCUMENT | undefined>
}

export interface RepositoryWrite<DTO, DOCUMENT> {
    createOne(dto: DTO, repositoryOptions: RepositoryOptions): Promise<DOCUMENT>
    updateOneById(id: string, dto: DTO): Promise<DOCUMENT>
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
