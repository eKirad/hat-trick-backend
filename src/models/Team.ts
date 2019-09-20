import mongoose, { Schema, mongo, Model } from 'mongoose';
import { ITeam } from '../interfaces/ITeam';

const teamSchema: Schema = new Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    stadium: { type: String, required: true },
    headCoach: { type: String, required: true },
    league: { type: String, required: true },
    captain: { type: String, required: true },
});

export const Team: Model<ITeam> = mongoose.model<ITeam>(`Team`, teamSchema);
