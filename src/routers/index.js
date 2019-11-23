var express = require('express');

const app = express();

app.use( require('./user/users-routes') )

module.exports = app;
