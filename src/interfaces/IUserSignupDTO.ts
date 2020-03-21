import { UserRole } from './TypeUserRole';

export default interface IUserSignupDTO {
    eMail: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
}