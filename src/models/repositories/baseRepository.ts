import { Model as MongooseModel } from "mongoose"
import { PopulatedFields, RepositoryOptions, RepositoryRead, RepositoryWrite } from "../../types"
import { excludeFields } from "../../utils/database.utils"
import { defaultRepositoryOptions } from "../../shared/consts"

export class BaseRepository<DTO, DOCUMENT> implements RepositoryRead<DOCUMENT>, RepositoryWrite<DTO, DOCUMENT> {
    private populateFields: PopulatedFields[] = [
        {
            path: "",
            select: "",
        },
    ]

    private excludedFields = []

    public constructor(private Model: MongooseModel<DOCUMENT>) {}

    public findAll = async (options: RepositoryOptions = defaultRepositoryOptions): Promise<Array<DOCUMENT>> => {
        let models = await this.Model.find().exec()

        if (models.length === 0) return undefined

        if (options.lean) models = models.map((model) => model.toObject()) as any

        return models
    }

    public findOneById = async (id: string, options: RepositoryOptions = defaultRepositoryOptions): Promise<DOCUMENT | undefined> => {
        let model = await this.Model.findById(id).exec()

        if (!model) return undefined

        if (options.populate) await this.Model.populate(model, this.populateFields)

        if (options.lean) model = model.toObject() as any

        if (options.excludeFields) excludeFields(this.excludedFields, model)

        return model
    }

    public findOne = async (data: any, options: RepositoryOptions = defaultRepositoryOptions): Promise<DOCUMENT | undefined> => {
        let model = await this.Model.findOne(data).exec()

        if (!model) return undefined

        if (options.populate) await this.Model.populate(model, this.populateFields)

        if (options.lean) model = model.toObject() as any

        if (options.excludeFields) excludeFields(this.excludedFields, model)

        return model
    }

    public createOne = async (dto: DTO, options: RepositoryOptions = defaultRepositoryOptions): Promise<DOCUMENT> => {
        let model = await this.Model.create(dto)

        if (options.populate) await this.Model.populate(model, this.populateFields)

        if (options.lean) model = model.toObject() as any

        if (options.excludeFields) excludeFields(this.excludedFields, model)

        return model
    }

    public updateOneById = async (id: string, dto: DTO): Promise<DOCUMENT | undefined> => {
        const model = await this.Model.findByIdAndUpdate(id, dto, { new: true }).exec()

        if (!model) return undefined

        return model
    }

    public deleteOneById = async (id: string): Promise<any> => await this.Model.findByIdAndDelete(id).exec()

    public createMany = async (dtos: Array<DTO>, _options: RepositoryOptions = defaultRepositoryOptions): Promise<any> => {
        const models = await this.Model.insertMany(dtos)

        return models
    }
}
