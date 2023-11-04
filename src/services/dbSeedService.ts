import logger from "../config/logger/winstonLogger"
import { generateUsers } from "../models/seed/users"

class DbSeedService {
    public runDBSeed = async () => {
        try {
            logger.info(`Running DB seed...`)
            logger.info(`1. Generating demo users...`)
            await generateUsers()
            logger.info(`Successfully generated demo users.`)
            logger.info(`Successfully ran DB seed.`)
        } catch (error) {
            console.error(`Error when running DB seed: ${error}`)
        }
    }
}

export default new DbSeedService()
