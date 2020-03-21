"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.connectToDB = (config) => {
    mongoose_1.default.connect(config.DATABASE.URI + config.DATABASE.NAME, {
        useCreateIndex: true,
        useNewUrlParser: true
    });
    const db = mongoose_1.default.connection;
    db.once(`open`, err => {
        if (err) {
            throw err;
        }
        console.log(`Database ready!`);
    });
    db.on(`error`, reason => console.log(reason));
};
//# sourceMappingURL=database.js.map