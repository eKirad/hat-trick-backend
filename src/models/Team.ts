import mongoose, { Schema, mongo, Model } from 'mongoose';
import { ITeam } from '../interfaces/ITeam';

const teamSchema: Schema = new Schema({
    name: { type: String, required: true },
    country: { type: String, required: true }
});

export const Team: Model<ITeam> = mongoose.model<ITeam>(`Team`, teamSchema);
