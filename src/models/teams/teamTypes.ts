import { Document, Types } from "mongoose"

export interface Team {
    name: string
    shortCode: string
    league: Types.ObjectId
    createdAt: Date
    lastUpdatedAt: Date
}

export interface TeamDocument extends Team, Document {}
