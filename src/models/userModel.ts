import mongoose, { Schema, Document } from "mongoose"
import { User } from "../types"

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date },
    lastUpdatedAt: { type: Date },
})

const UserModel = mongoose.model<User & Document>("User", UserSchema)
export default UserModel
