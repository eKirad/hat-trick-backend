const port = process.env.SERVER_PORT;
const dbURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds058369.mlab.com:58369/hat-trick`;

const jwtSecret = process.env.JWT_SECRET || `very secret secret`;

module.exports = {
    dev: {
        port,
        dbURI,
        jwtSecret
    },
    prod: {}
}