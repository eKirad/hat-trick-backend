"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const User_1 = require("../models/User");
// FIXME: There is mayber a better way to handle this.
const isValid = (body) => {
    const returnObj = {
        isValid: true,
        missingProperty: ``
    };
    if (!Object.prototype.hasOwnProperty.call(body, `password`)) {
        returnObj.isValid = false;
        returnObj.missingProperty = `password`;
    }
    if (!Object.prototype.hasOwnProperty.call(body, `username`)) {
        returnObj.isValid = false;
        returnObj.missingProperty = `username`;
    }
    if (!Object.prototype.hasOwnProperty.call(body, `email`)) {
        returnObj.isValid = false;
        returnObj.missingProperty = `email`;
    }
    return returnObj;
};
const login = (req, res) => {
    //TODO:
};
const logout = (req, res) => {
    //TODO:
};
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validator = isValid(req.body);
    if (!validator.isValid) {
        return res.status(400).json({
            error: 'Bad Request',
            message: `The request body must contain a ${validator.missingProperty} property`
        });
    }
    const user = {
        firstName: req.body.firstName,
        familyName: req.body.familyName,
        username: req.body.username,
        password: bcrypt_1.default.hashSync(req.body.password, 8),
        email: req.body.email,
        role: `normal`
    };
    try {
        const userCreated = yield User_1.User.create(user);
        const token = jsonwebtoken_1.default.sign({
            id: userCreated._id,
            firstName: userCreated.firstName,
            familyName: userCreated.familyName,
            email: userCreated.email,
            username: userCreated.username,
            role: userCreated.role
        }, config_1.config.dev.jwtSecret, {
            expiresIn: 86400
        });
        yield res.status(200).json({ token });
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                error: 'User exists',
                message: error.message
            });
        }
        else {
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }
    // User.create(user)
    //     .then((user) => {
    //         const token = jwt.sign({
    //             id: user._id,
    //             firstName: user.firstName,
    //             familyName: user.familyName,
    //             email: user.email,
    //             username: user.username,
    //             role: user.role
    //         }, config.dev.jwtSecret, {
    //             expiresIn: 86400
    //         });
    //     res.status(200).json({ token })
    //     })
    //     .catch((error) => {
    //         if (error.code === 11000) {
    //             res.status(400).json({
    //                 error: 'User exists',
    //                 message: error.message
    //             })
    //         } else {
    //             res.status(500).json({
    //                 error: 'Internal server error',
    //                 message: error.message
    //             });
    //         }
    //     });
});
const me = (req, res) => {
    //TODO:
};
exports.authController = {
    login,
    logout,
    signup,
    me
};
//# sourceMappingURL=auth-controller.js.map