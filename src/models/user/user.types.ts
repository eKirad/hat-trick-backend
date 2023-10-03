import { Document } from "mongoose"

export interface UserDocument extends Document {
    email: string
    firstName: string
    lastName: string
    password: string
    salt: Buffer
    createdAt: Date
    lastUpdatedAt: Date
}
