import mongoose from 'mongoose';
import winston from 'winston';

export class Database {
    
    private _dbURI: string;
    
    private _dbName: string;

    private _logger: winston.Logger;
    
    constructor(dbUri: string, dbName: string, logger: winston.Logger) {
        this._dbURI = dbUri;
        this._dbName = dbName;
        this._logger = logger;
    }

    async connect() {
        try {
            const dbOptions: object = {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }

            await mongoose.connect(this._dbURI + this._dbName, dbOptions);
            this._logger.info(`Database up and running!`);
        } catch(err) {
            this._logger.error(err);
        }
    }
}