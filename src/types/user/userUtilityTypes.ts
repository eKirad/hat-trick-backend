import { User } from "./userType";

export type UserRegisterDTO = Omit<User, "_id" | "dateCreateAt" | "lastUpdatedAt">
export type PickUserLoginProps = "email" | "password";
export type UserResponse = Omit<User, "password">