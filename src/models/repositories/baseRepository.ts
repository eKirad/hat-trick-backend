import { Model as MongooseModel, EnforceDocument } from "mongoose"
import { PopulatedFields, RepositoryOptions, RepositoryRead, RepositoryWrite } from "../../types/common"
import { excludeFields } from "../../utils/database.utils"
import { defaultRepositoryOptions } from "../../shared/consts"

export class BaseRepository<M> implements RepositoryRead<M>, RepositoryWrite<M> {
    private populateFields: PopulatedFields[] = [
        {
            path: "",
            select: "",
        },
    ]

    private excludedFields = []

    public constructor(private Model: MongooseModel<M>) {}

    public findAll = async (): Promise<any> => await this.Model.find().exec()

    public findOneById = async (id: string, options: RepositoryOptions = defaultRepositoryOptions): Promise<EnforceDocument<M, {}> | undefined> => {
        let model = await this.Model.findById(id).exec()

        if (!model) return undefined

        if (options.populate) await this.Model.populate(model, this.populateFields)

        if (options.lean) model = model.toObject()

        if (options.excludeFields) excludeFields(this.excludedFields, model)

        return model
    }

    public findOne = async (data: any, options: RepositoryOptions = defaultRepositoryOptions): Promise<EnforceDocument<M, {}>> => {
        let model = await this.Model.findOne(data).exec()

        if (!model) return undefined

        if (options.populate) await this.Model.populate(model, this.populateFields)

        if (options.lean) model = model.toObject()

        if (options.excludeFields) excludeFields(this.excludedFields, model)

        return model
    }

    public createOne = async (dto: M): Promise<EnforceDocument<M, {}>> => await this.Model.create(dto)

    public updateOneById = async (id: string, dto: M): Promise<EnforceDocument<M, {}> | undefined> => {
        const model = await this.Model.findByIdAndUpdate(id, dto, { new: true }).exec()

        if (!model) return undefined

        return model
    }

    public deleteOneById = async (id: string): Promise<void> => await this.Model.findByIdAndDelete(id).exec()
}
