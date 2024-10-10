import logger from "../config/logger/winstonLogger"
import { generateEuro2024League, generateLeagues } from "../models/seed/leagues"
import { generateEuro2024Teams, generateTeams } from "../models/seed/teams"
import { generateUsers } from "../models/seed/users"

class DbSeedService {
    public runDBSeed = async () => {
        try {
            logger.info(`Running DB seed...`)

            // await generateUsers()
            // await generateEuro2024League()
            await generateEuro2024Teams()
            // await generateTeams()

            logger.info(`Successfully ran DB seed.`)
        } catch (error) {
            console.error(`Error when running DB seed: ${error}`)
        }
    }
}

export default new DbSeedService()
