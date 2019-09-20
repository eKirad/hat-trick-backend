import { Team } from '../models/Team';

const getAllTeams = async (req: any, res: any) => {
    const teams = await Team.find({ });
    await res.status(200).json(teams);
};

const getTeam = (req: any, res: any) => {

};

const addTeam = async (req: any, res: any) => {
    console.log(req.body);
    const newTeam = await Team.create({
        name: req.body.name,
        country: req.body.country
    });
    await res.status(200).json(newTeam);
};

const deleteTeam = (req: any, res: any) => {

};

export const teamController = {
    getAllTeams,
    getTeam,
    addTeam,
    deleteTeam
};
