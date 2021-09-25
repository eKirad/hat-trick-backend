import mongoose, { ConnectOptions } from 'mongoose';
import { Logger } from 'winston';

export default class Database {
    private dbURI: string;    
    private dbName: string;
    private logger: Logger;

    private getConnectOptions = (): ConnectOptions => ({ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
    
    constructor(dbUri: string, dbName: string, logger: Logger) {
        this.dbURI = dbUri;
        this.dbName = dbName;
        this.logger = logger;
    }

    connect = async () => {
        try {
            const dbOptions = this.getConnectOptions();
            await mongoose.connect(this.dbURI + this.dbName, dbOptions);
            this.logger.info(`Database up and running!`);
        } catch(e) {
            this.logger.error(`Database connection unsuccessful. Error: ${e}`);
        }
    }
}