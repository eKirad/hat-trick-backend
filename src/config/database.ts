import mongoose from 'mongoose';

export const database = (config: any) => {
    mongoose.connect(config.dbURI);
    const db = mongoose.connection;
    db.once(`open`, err => {
        if (err) {
            throw err;
        }
        console.log(`Database ready!`);
    });

    db.on(`error`, reason => {
        console.log(reason);
    })
}