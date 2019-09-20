import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const isAuthenticated = (req: any, res: any, next: any) => {
    let token =  ``;
    if (req.headers.authorization) {
        token = req.headers.authorization.substring(4);
    }

    if (!token) {
        return res.status(401)
            .sned({
                error: `Unauthorized`,
                message: `No token provided in the request`
            })
    }

    jwt.verify(token, config.dev.jwtSecret, (err: any, decoded: any) => {
        if (err) {
            return res.status(401)
            .send({
                error: `Unauthorized`,
                message: `No token provided in the request`
            })
        }

        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req: any, res: any, next: any) => {
    // TODO:
};


export const middleware = {
    isAuthenticated,
    isAdmin
};


