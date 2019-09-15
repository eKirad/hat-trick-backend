import mongoose, { Schema } from 'mongoose';
import { ITeam } from '../interfaces/ITeam';

const teamSchema: Schema = new Schema({
    name: { type: String, required: true },
    country: { type: String, required: true }
});

// module.exports = mongoose.model(`Team`, teamSchema);
module.exports =  mongoose.model<ITeam>(`Team`, teamSchema);