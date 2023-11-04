import { Document } from "mongoose"

export interface League {
    name: string
    shortCode: string
    createdAt: Date
    lastUpdatedAt: Date
}

export interface LeagueDocument extends League, Document {}
