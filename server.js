// imports
const express = require('express');
const logger = require('morgan');
const dbLogger = require('mongo-morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const messageRouter = require('./routes/messages');

// configs
require('dotenv').config();
require('./config/db');

// server
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
// app.use(logger('dev'));
// app.use(dbLogger(process.env.DB_URL, 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/message', messageRouter);


// spin up
app.listen(port, () => console.log(`Server is up and running on port ${ port }!`));