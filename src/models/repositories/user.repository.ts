import UserModel from "../userModel"
import { BaseRepository, BaseRepositoryOptions, PopulatedField } from "./base.repository"
import { HydratedDocument } from "mongoose"
import { excludeFields } from "../../utils/database.utils"

class UserRepository implements BaseRepository {
    private populateFields: PopulatedField[] = [
        {
            path: "matchedTransactions",
            select: "_id transactionId transactionData transactionType cardData status",
        },
    ]

    private excludedFields = []

    async findById<T>(id: string, options: BaseRepositoryOptions): Promise<T> {
        let userModel = await UserModel.findById(id).exec()

        if (!userModel) return undefined

        if (options.populate) await UserModel().populate(userModel, this.populateFields)

        if (options.lean) userModel = userModel.toObject()

        if (options.excludeFields) excludeFields(this.excludedFields, userModel)

        return userModel
    }

    async findOne(data: any, options: BaseRepositoryOptions): Promise<typeof UserModel> {
        let userModel = await UserModel.findOne(data).exec()

        if (!userModel) return undefined

        if (options.populate) await UserModel().populate(userModel, this.populateFields)

        if (options.lean) userModel = userModel.toObject()

        if (options.excludeFields) excludeFields(this.excludedFields, userModel)

        return userModel
    }

    updateOne(object: HydratedDocument<any>, updateData: any, options: BaseRepositoryOptions): Promise<HydratedDocument<any>> {
        throw new Error("Method not implemented.")
    }

    softDeleteOne(object: HydratedDocument<any>, options: BaseRepositoryOptions): Promise<HydratedDocument<any>> {
        throw new Error("Method not implemented.")
    }
}

export const userRepository = new UserRepository()
