import mongoose, { Schema , Model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema: Schema = new Schema({
    username: { type: String, required: true, uniue: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String },
    familyName: {type: String },
    genedr: { type: String },
});

export const User: Model<IUser> = mongoose.model<IUser>(`User`, userSchema);
