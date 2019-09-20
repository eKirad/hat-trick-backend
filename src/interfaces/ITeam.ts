import mongoose from 'mongoose';

export interface ITeam extends mongoose.Document {
    name: string,
    country: string,
    stadium: string,
    headCoach: string,
    league: string,
    captain: string
}