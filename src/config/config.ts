const port = process.env.PORT || 8000;

// Will be replaced later
const user = `hattrick`;
const pass = `admin123`;
const dbURI = `mongodb://${user}:${pass}@ds058369.mlab.com:58369/hat-trick`;

// const dbURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds058369.mlab.com:58369/hat-trick`;

const jwtSecret = process.env.JWT_SECRET || `very secret secret`;

module.exports = {
    dev: {
        port,
        dbURI,
        jwtSecret
    },
    prod: {}
}