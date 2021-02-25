'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const {TASK_URL} = require('./config/CONSTS.json');

const app = express(); 
app.use(cors());
app.use(bodyParser.json());


const logger = (req, res, next) => {
    console.log(new Date());
    next();
}

app.use(logger);

const taskRoute = require('./routes/tasks');

app.use("/"+TASK_URL,taskRoute);

app.use((req,res,next) => {
    next(createError(404, "Resource Not Found"));
})

app.use((err,req,res,next) => {
    res.status(500).send("Something went Wrong: " + err.message);
})

// communicate with the app on a specific port
const server = app.listen(5019, () => {
    console.log(`Server has successfully started on port number: ${server.address().port}`);
});