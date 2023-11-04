import { Schema, model } from "mongoose"
import { TeamDocument } from "./teamTypes"

const teamSchema = new Schema<TeamDocument>({
    name: { type: String, required: [true, "Name is required"] },
    shortName: { type: String, required: [true, "Short name is required"] },
    nicknames: [{ type: String }],
    ground: { type: String, required: [true, "Ground is required"] },
    league: {
        type: Schema.Types.ObjectId,
        ref: "League",
        required: [true, "League is required"],
    },
    createdAt: { type: Date, default: () => new Date() },
    lastUpdatedAt: { type: Date, default: () => new Date() },
})

const TeamModel = model<TeamDocument>("Team", teamSchema)

export default TeamModel
