import { BaseService } from "./baseService"
import { League, LeagueDocument } from "../models/leagues/leagueTypes"
import LeagueRepository from "../models/repositories/leagueRepository"
import LeagueModel from "../models/leagues/leagueSchema"
import { omitMultipleMongooseObjectProps } from "../utils/objectHandlers"

class LeagueService extends BaseService<League, LeagueDocument, LeagueRepository> {
    constructor() {
        super(new LeagueRepository(LeagueModel), LeagueModel)
    }

    modelToDTO = (model: LeagueDocument): League => {
        const userDTO = omitMultipleMongooseObjectProps<LeagueDocument, League>(model)

        return userDTO
    }

    modelsToDTOs = (models: LeagueDocument[]): League[] => {
        const userDTOs = models.map((model: LeagueDocument) => omitMultipleMongooseObjectProps<LeagueDocument, League>(model))

        return userDTOs
    }
}

export default new LeagueService()
