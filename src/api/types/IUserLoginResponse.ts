import IUserAPI from "./IUserAPI";

export default interface IUserLoginResponse {
    userAPI: IUserAPI;
    accessToken: string;
}