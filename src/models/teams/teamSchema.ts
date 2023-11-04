import { Schema, model } from "mongoose"
import { TeamDocument } from "./teamTypes"

const teamSchema = new Schema<TeamDocument>({
    name: { type: String, required: true },
    shortCode: { type: String, required: true },
    league: {
        type: Schema.Types.ObjectId,
        ref: "League",
        required: [true, "Team is required"],
    },
    createdAt: { type: Date },
    lastUpdatedAt: { type: Date },
})

const TeamModel = model<TeamDocument>("Team", teamSchema)

export default TeamModel
