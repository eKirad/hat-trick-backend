import { UserDocument } from "../../models/user/user.types"

export type UserRegisterDTO = Pick<UserDocument, "email" | "password" | "firstName" | "lastName">
export type UserLoginDTO = Pick<UserDocument, "email" | "password">
export type UserResponse = Omit<UserDocument, "password" | "salt">

export type UserDTOs = UserRegisterDTO | UserLoginDTO | UserResponse
