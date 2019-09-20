import mongoose, { Schema , Model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    familyName: {type: String, required: true },
    username: { type: String, required: true, uniue: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    genedr: { type: String },
    dateOfBirth: { type: String }
});

export const User: Model<IUser> = mongoose.model<IUser>(`User`, userSchema);
