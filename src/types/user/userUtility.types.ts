import { UserDocument } from "../../models/user/userTypes"

export type UserRegisterDTO = Pick<UserDocument, "email" | "password" | "firstName" | "lastName">
export type UserLoginDTO = Pick<UserDocument, "email" | "password">
export type UserResponse = Omit<UserDocument, "password" | "salt">

export type UserDTOs = UserRegisterDTO | UserLoginDTO | UserResponse

export type Password = {
    hash: string
    salt: Buffer
}
