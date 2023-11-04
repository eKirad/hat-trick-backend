import { BaseService } from "./baseService"
import { League, LeagueDocument } from "../models/leagues/leagueTypes"
import LeagueRepository from "../models/repositories/leagueRepository"
import LeagueModel from "../models/leagues/leagueSchema"

class LeagueService extends BaseService<League, LeagueDocument, LeagueRepository> {
    constructor() {
        super(new LeagueRepository(LeagueModel), LeagueModel)
    }

    // modelToDTO = (model: LeagueDocument): League => {
    //     const propsToOmit = [`password`, `salt`]
    //     const userDTO = omitMultipleMongooseObjectProps<UserDocument, League>(model, propsToOmit)

    //     return userDTO
    // }

    // modelsToDTOs = (models: LeagueDocument[]): League[] => {
    //     const propsToOmit = [`password`, `salt`]
    //     const userDTOs = models.map((model: LeagueDocument) => omitMultipleMongooseObjectProps<LeagueDocument, League>(model, propsToOmit))

    //     return userDTOs
    // }
}

export default new LeagueService()
