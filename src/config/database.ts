import mongoose from 'mongoose';

export const connectToDB = (config: any) => {
    mongoose.connect(config.DATABASE.URI + config.DATABASE.NAME, {
        useCreateIndex: true,
        useNewUrlParser: true
    });
    const db = mongoose.connection;
    db.once(`open`, err => {
        if (err) {
            throw err;
        }
        console.log(`Database ready!`);
    });

    db.on(`error`, reason => console.log(reason));
}