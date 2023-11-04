import { Document, Types } from "mongoose"

export interface Team {
    name: string
    shortName: string
    nicknames: Array<string>
    ground: string
    league: Types.ObjectId
    createdAt: Date
    lastUpdatedAt: Date
}

export interface TeamDocument extends Team, Document {}
