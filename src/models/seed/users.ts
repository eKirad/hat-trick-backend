import { UserRegisterDTO } from "../../types"
import dotenv from "dotenv"
import * as bcrypt from "bcryptjs"
import userService from "../../services/userService"

dotenv.config()

const generateCommonUserData = ({ firstName, lastName, email, password }: UserRegisterDTO) => ({
    email,
    firstName,
    lastName,
    password: bcrypt.hashSync(password),
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
})

export const generateUsers = async () => {
    const user1 = generateCommonUserData({ email: "john@doe.com", firstName: "John", lastName: "Doe", password: process.env.DEFAULT_PASSWORD })
    const user2 = generateCommonUserData({ email: "max@muster.com", firstName: "Max", lastName: "Musterman", password: process.env.DEFAULT_PASSWORD })
    const user3 = generateCommonUserData({ email: "John@atanasoff.com", firstName: "John", lastName: "At", password: process.env.DEFAULT_PASSWORD })

    const createdUsers = await userService.createMany([user1, user2, user3])
}
