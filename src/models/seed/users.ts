import { UserRegisterDTO } from "../../types"
import dotenv from "dotenv"
import * as bcrypt from "bcryptjs"
import userService from "../../services/userService"
import logger from "../../config/logger/winstonLogger"

dotenv.config()

const generateUserData = ({ firstName, lastName, email, password }: UserRegisterDTO) => ({
    email,
    firstName,
    lastName,
    password: bcrypt.hashSync(password),
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
})

export const generateUsers = async () => {
    logger.info(`Creating demo data ....`)
    try {
        const user1 = generateUserData({ email: "john@doe.com", firstName: "John", lastName: "Doe", password: process.env.DEFAULT_PASSWORD })
        const user2 = generateUserData({ email: "max@muster.com", firstName: "Max", lastName: "Musterman", password: process.env.DEFAULT_PASSWORD })
        const user3 = generateUserData({ email: "John@atanasoff.com", firstName: "John", lastName: "At", password: process.env.DEFAULT_PASSWORD })

        await userService.createMany([user1, user2, user3])
        logger.info(`Successfully created demo users.`)
    } catch (error) {
        logger.error(`Error creating demo data: ${error}`)
    }
}
