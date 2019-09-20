import { Team } from '../models/Team';

const getAllTeams = (req: any, res: any) => {
    Team
        .find({ })
        .then(teams => {
            res
                .status(200)
                .json(teams);
        })
}



export const teamController = {
    getAllTeams
};
