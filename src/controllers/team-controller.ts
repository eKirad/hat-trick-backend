import { Team } from '../models/Team';

const getAllTeams = async (req: any, res: any) => {
    try {
        const teams = await Team.find({ });
        await res.status(200).json(teams);
    } catch(e) {
        console.error(e);
    }
};

const getTeam = (req: any, res: any) => {

};

const addTeam = async (req: any, res: any) => {
    try {
        const newTeam = await Team.create({
            name: req.body.name,
            country: req.body.country,
            stadium: req.body.stadium,
            headCoach: req.body.headCoach,
            league: req.body.league,
            captain: req.body.captain
        });
        await res.status(200).json(newTeam);
    } catch(e) {
        console.error(e);
    }
};

const deleteTeam = async (req: any, res: any) => {
    try {
        await Team.findByIdAndRemove(req.params.id);
        await res.status(200).json({
            message: `Team with id=${req.params.id} was successfully deleted.`
        })
    } catch(e) {
        console.error(e);
    }
};

const updateTeam = async (req: any, res: any) => {
    try {
        // TODO:
    } catch(e) {
        console.error(e);
    }
};

export const teamController = {
    getAllTeams,
    getTeam,
    addTeam,
    deleteTeam,
    updateTeam
};
