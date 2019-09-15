import { Team } from '../models/Team';

export const teamController = {
    getAllTeams: (req: any, res: any) => {
        Team
            .find({ })
            .then(teams => {
                res
                    .status(200)
                    .json(teams);
            })
    }
}