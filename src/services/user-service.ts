import jwt from 'jsonwebtoken';

const getCurrentUser = (authHeader: any): any => {
    return jwt.decode(authHeader.split(` `)[1]);
};

export const userService = {
    getCurrentUser
};