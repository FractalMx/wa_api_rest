const express = require("express");

const cors = require('cors');
const app = express();

/* 
const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN; */

app.set('port', process.env.PORT || '0.0.0.0');
app.set('host', process.env.HOST || '0.0.0.0');

app.use(cors());

app.use(express.json());

app.use('/wa', require('./routes/waSetup') );
app.use(express.static('uploads'));
module.exports = app;