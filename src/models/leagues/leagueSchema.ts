import { Schema, model } from "mongoose"
import { LeagueDocument } from "./leagueTypes"

const leagueSchema = new Schema<LeagueDocument>({
    name: { type: String, required: true },
    shortCode: { type: String, required: true },
})

const LeagueModel = model<LeagueDocument>("League", leagueSchema)

export default LeagueModel