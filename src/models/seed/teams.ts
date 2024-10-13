import dotenv from "dotenv"
import logger from "../../config/logger/winstonLogger"
import { Team } from "../teams/teamTypes"
import { Types } from "mongoose"
import teamService from "../../services/teamService"
import leagueService from "../../services/leagueService"
import LeagueModel from "../leagues/leagueSchema"

dotenv.config()

const generateTeamData = ({ name, shortName, ground, league, nicknames }: Team) => ({
    name,
    shortName,
    ground,
    league,
    nicknames,
})

export const generateTeams = async () => {
    logger.info(`Creating demo teams ....`)

    const league1 = await leagueService.findOneDocument({ name: "test" })

    try {
        const team1 = generateTeamData({
            name: "FC Copenhagen",
            shortName: "FCK",
            ground: "Parken Stadium",
            league: new Types.ObjectId("6546513e739cdc92b3dd8014"),
            nicknames: ["The Lions", "Byens Hold"],
        })

        const team2 = generateTeamData({
            name: "Brondby IF",
            shortName: "BIF",
            ground: "Brondby Stadium",
            league: new Types.ObjectId("6546513e739cdc92b3dd8014"),
            nicknames: ["Drengene fra Vestegnen"],
        })

        const team3 = generateTeamData({
            name: "Silkeborg IF",
            shortName: "SIF",
            ground: "JYSK Park",
            league: new Types.ObjectId("6546513e739cdc92b3dd8014"),
        })

        const team4 = generateTeamData({
            name: "FC Midtjylland",
            shortName: "FCM",
            ground: "MCH Arena",
            league: new Types.ObjectId("6546513e739cdc92b3dd8014"),
        })

        const team5 = generateTeamData({
            name: "FC Nordsjælland",
            shortName: "FCN",
            ground: "Right to the Dream Park",
            league: new Types.ObjectId("6546513e739cdc92b3dd8014"),
        })

        await teamService.createMany([team1, team2, team3, team4, team5])
        logger.info(`Successfully created demo teams.`)
    } catch (error) {
        logger.error(`Error creating demo data: ${error}`)
    }
}
