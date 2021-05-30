export type User = {
    _id: string,
    email: string,
    password: string
    firstName: string,
    lastName: string,
    dateCreateAt: Date,
    lastUpdatedAt: Date
}

export type OmitUserProps = "_id" | "dateCreateAt" | "lastUpdatedAt";
export type PickUserLoginProps = "email" | "password";