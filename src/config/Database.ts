import mongoose from 'mongoose';

export class Database {
    
    private dbURI: string;
    
    private dbName: string;

    constructor(dbUri: string, dbName: string) {
        this.dbURI = dbUri;
        this.dbName = dbName;
    }

    async connect() {
        try {
            await mongoose.connect(this.dbURI + this.dbName, {
                useCreateIndex: true,
                useNewUrlParser: true
                }
            );
            console.log(`Database up and running!`);
        } catch(err) {
            console.error(err);
        }
    }
}