import { Document, Types } from "mongoose"

export interface Team {
    name: string
    shortName: string
    ground: string
    league: Types.ObjectId
    nicknames?: Array<string>
    createdAt?: Date
    lastUpdatedAt?: Date
}

export interface TeamDocument extends Team, Document {}
