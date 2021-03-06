import UserModel from "../models/userModel";
import { User } from "../types";
import { BaseService } from "./baseService";

export default class UserService extends BaseService<User> {
    public constructor() { super(UserModel) }
}