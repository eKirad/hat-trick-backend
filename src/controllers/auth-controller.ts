import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config/config';
import { User } from '../models/User';

// FIXME: There is mayber a better way to handle this.
const isValid = (body: object) => {
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


const login = (req: any, res: any) => {
    //TODO:
};

const logout = (req: any, res: any) => {
    //TODO:
};

const signup = async (req: any, res: any) => {
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
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email,
        role: `normal`
    };


    try {
        const userCreated = await User.create(user);
        const token = jwt.sign({
            id: userCreated._id,
            firstName: userCreated.firstName,
            familyName: userCreated.familyName,
            email: userCreated.email,
            username: userCreated.username,
            role: userCreated.role
        }, config.dev.jwtSecret, {
            expiresIn: 86400
        });

        await res.status(200).json({ token })
    } catch(error) {
        if (error.code === 11000) {
            res.status(400).json({
                error: 'User exists',
                message: error.message
            })
        } else {
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
};

const me = (req: any, res: any) => {
    //TODO:
};

export const authController = {
    login,
    logout,
    signup,
    me
};