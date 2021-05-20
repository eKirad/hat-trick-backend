import UserModel from "../models/userModel";
import { User } from "../types/userType";
import { BaseController } from "./baseController";

export class UserController extends BaseController {
    constructor() {
        super(UserModel)
    }
}