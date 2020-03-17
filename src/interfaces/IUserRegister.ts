type UserRole = `admin` | `default`;

export default interface IUserRegister {
    eMail: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
}