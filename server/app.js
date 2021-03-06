const express = require('express');
var path = require("path")

require('dotenv').config();


const app = express();
app.use(express.static(path.join(__dirname, 'build')));


//TODO Initialized Sentry to log error.

require('./init/routes')(app);

/**
 * This is added to deploy the project to heroku you can remove this else in case
 */
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

process.env.PWD = process.cwd();
module.exports = app;