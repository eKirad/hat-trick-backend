import { UserLoginDTO } from "../types"
import * as bcrypt from "bcryptjs"

const hashPassword = (plainPassword: string): string => bcrypt.hashSync(plainPassword)

export const convertUserDTOToModel = (userDTO: UserLoginDTO) => ({
    ...userDTO,
    password: hashPassword(userDTO.password),
    dateCreateAt: new Date(),
    lastUpdatedAt: new Date(),
})
