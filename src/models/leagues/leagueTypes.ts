import { Document } from "mongoose"

export interface LeagueDocument extends Document {
    name: string
    shortCode: string
}
