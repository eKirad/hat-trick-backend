import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config/config';
import { User } from '../models/User';

const isValid = (body: object, type: string): any => {
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

    if (type === `signupValidator`) {
        if (!Object.prototype.hasOwnProperty.call(body, `email`)) {
            returnObj.isValid = false;
            returnObj.missingProperty = `email`;
        }
    }

    return returnObj;
};

const login = async (req: any, res: any) => {
    const validator = isValid(req.body, `loginValidator`);

    if (!validator.isValid) {
        return res.status(400).json({
            error: 'Bad Request',
            message: `The request body must contain a ${validator.missingProperty} property`
        });
    }

    try {
        const foundUser = await User.findOne({ username: req.body.username });
        const isValidPassword = bcrypt.compareSync(req.body.password, foundUser.password);
        
        if (!isValidPassword) {
            return res.status(401).send({ token: null });
        }

        const token = jwt.sign({
            id: foundUser._id,
            firstName: foundUser.firstName,
            familyName: foundUser.familyName,
            email: foundUser.email,
            username: foundUser.username,
            role: foundUser.role
        }, config.dev.jwtSecret, {
            expiresIn: 86400
        });

        res.status(200).json({ token })
    } catch(error) {
        return res.status(404).json({
            error: `User not found`,
            message: error.message
        })
    }
};

const logout = (req: any, res: any) => {
    res.status(200).send({ token: null });
};

const signup = async (req: any, res: any) => {
    const validator = isValid(req.body, `signupValidator`);

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
};


export const authController = {
    login,
    logout,
    signup,
};