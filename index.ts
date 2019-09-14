import express from 'express';
// import bodyParser from 'body-parser';
// import helmet from 'helmet';
// const env = 

// api
const apiVersion = `v1`;
const api = `/api/${apiVersion}`;


const app = express();
const port = 3000;
app.get(`/`, (req, res) => {
    res.send(`Hi there`);
});

app.listen(port, err => {
    if (err) {
        return console.error(err);
    }

    return console.log(`server is listening on ${port}`)
});

