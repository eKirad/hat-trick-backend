import { Schema, model } from "mongoose"
import { UserDocument } from "./user.types"
import AuthService from "../../services/authService"

const userSchema = new Schema<UserDocument>({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    salt: Buffer,
    createdAt: { type: Date },
    lastUpdatedAt: { type: Date },
})

userSchema.methods.setPassword = function (plainTextPassword: string) {
    const { hash, salt } = AuthService.hashPassword(plainTextPassword)
    this.salt = salt
    this.password = hash
}

const UserModel = model<UserDocument>("User", userSchema)

export default UserModel