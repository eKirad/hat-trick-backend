// DRY!!!
import dotenv from 'dotenv';
dotenv.config();

// const dbURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds058369.mlab.com:58369/hat-trick`;

export const environment = process.env.NODE_ENV;
export const config = {
    DEV: {
        DATABASE: {
            URI: process.env.DB_URI || `mongodb://localhost:27017/`,
            NAME: process.env.DB_NAME || `hattrickDB`
        },
        AUTHENTICATION: {
            JWT_SECRET: process.env.JWT_SECRET || `very secret secret`,
        },
        APP: {
            PORT: process.env.SERVER_PORT
        }
    },
    PROD: { }
}