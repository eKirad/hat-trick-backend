import { League } from "./../leagues/leagueTypes"
import dotenv from "dotenv"
import logger from "../../config/logger/winstonLogger"
import leagueService from "../../services/leagueService"

dotenv.config()

const generateLeagueData = ({ name, shortCode, createdAt, lastUpdatedAt }: League) => ({
    name,
    shortCode,
    createdAt,
    lastUpdatedAt,
})

export const generateLeagues = async () => {
    logger.info(`Creating demo leagues ....`)
    try {
        const league1 = generateLeagueData({ name: "Danish Superliga", shortCode: "DN", createdAt: new Date(), lastUpdatedAt: new Date() })

        await leagueService.createOneAndReturnDocument(league1)
        logger.info(`Successfully created demo leagues.`)
    } catch (error) {
        logger.error(`Error creating demo data: ${error}`)
    }
}
