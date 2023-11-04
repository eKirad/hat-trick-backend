import { BaseService } from "./baseService"
import { Team, TeamDocument } from "../models/teams/teamTypes"
import TeamRepository from "../models/repositories/teamRepository"
import TeamModel from "../models/teams/teamSchema"

class TeamService extends BaseService<Team, TeamDocument, TeamRepository> {
    constructor() {
        super(new TeamRepository(TeamModel), TeamModel)
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

export default new TeamService()
