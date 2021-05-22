import mongoose, { ConnectOptions } from 'mongoose';
import winston from 'winston';

export default class Database {

    private _dbURI: string;    
    private _dbName: string;
    private _logger: winston.Logger;

    private getConnectOptions = (): ConnectOptions => ({ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
    
    constructor(dbUri: string, dbName: string, logger: winston.Logger) {
        this._dbURI = dbUri;
        this._dbName = dbName;
        this._logger = logger;
    }

    connect = async () => {
        try {
            const dbOptions = this.getConnectOptions();
            await mongoose.connect(this._dbURI + this._dbName, dbOptions);
            this._logger.info(`Database up and running!`);
        } catch(err) {
            this._logger.error(err);
        }
    }
}