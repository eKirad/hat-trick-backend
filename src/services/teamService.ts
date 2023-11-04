import { BaseService } from "./baseService"
import { Team, TeamDocument } from "../models/teams/teamTypes"
import TeamRepository from "../models/repositories/teamRepository"
import TeamModel from "../models/teams/teamSchema"
import { omitMultipleMongooseObjectProps } from "../utils/objectHandlers"

class TeamService extends BaseService<Team, TeamDocument, TeamRepository> {
    constructor() {
        super(new TeamRepository(TeamModel), TeamModel)
    }

    modelToDTO = (model: TeamDocument): Team => {
        const userDTO = omitMultipleMongooseObjectProps<TeamDocument, Team>(model)

        return userDTO
    }

    modelsToDTOs = (models: Array<TeamDocument>): Array<Team> => {
        const userDTOs = models.map((model: TeamDocument) => omitMultipleMongooseObjectProps<TeamDocument, Team>(model))

        return userDTOs
    }
}

export default new TeamService()
