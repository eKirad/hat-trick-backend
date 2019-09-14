"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import bodyParser from 'body-parser';
// import helmet from 'helmet';
// const env = 
// api
const apiVersion = `v1`;
const api = `/api/${apiVersion}`;
const app = express_1.default();
const port = 3000;
app.get(`/`, (req, res) => {
    res.send(`Hi there`);
});
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map