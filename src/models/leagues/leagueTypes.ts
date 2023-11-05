import { Document } from "mongoose"

export interface League {
    name: string
    shortCode: string
    // TODO: Move to LeagueDocument
    createdAt: Date
    lastUpdatedAt: Date
}

export interface LeagueDocument extends League, Document {}
