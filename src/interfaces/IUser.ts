import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    firstName: string,
    familyName: string,
    username: string,
    password: string,
    email: string,
    genedr: string,
    dateOfBirth: string,
}