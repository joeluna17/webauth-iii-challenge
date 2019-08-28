const express = require('express');
const helmet = require('helmet');
const usersRouter = require('./usersRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api', usersRouter );

server.get("/", (req, res)=> {
    res.send(`<h1>Are you part of the resistance?</h1> <h2> Register and see if you are worthy, or tell me your password to proceed! </h2>`)
});




module.exports = server;

