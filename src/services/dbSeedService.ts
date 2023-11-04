import logger from "../config/logger/winstonLogger"
import { generateLeagues } from "../models/seed/leagues"
import { generateUsers } from "../models/seed/users"

class DbSeedService {
    public runDBSeed = async () => {
        try {
            logger.info(`Running DB seed...`)

            await generateUsers()
            await generateLeagues()

            logger.info(`Successfully ran DB seed.`)
        } catch (error) {
            console.error(`Error when running DB seed: ${error}`)
        }
    }
}

export default new DbSeedService()
