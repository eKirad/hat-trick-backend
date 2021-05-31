import { User } from "./userType";

export type OmitUserProps = "_id" | "dateCreateAt" | "lastUpdatedAt";
export type PickUserLoginProps = "email" | "password";
export type UserResponse = Omit<User, "password">