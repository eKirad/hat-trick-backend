import mongoose from 'mongoose';

export interface ITeam extends mongoose.Document {
    name: string,
    country: string
}