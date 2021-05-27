import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../types';

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    // TODO:
    // createdAt: { type: Date },
    // updatedAt: { type: Date },
    // password: { type: String }
});
  
const UserModel = mongoose.model<User & Document>('User', UserSchema);
export default UserModel;