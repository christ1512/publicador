var express = require('express');

const app = express();

app.use( require('./user/users-routes') )
app.use( require('./auth/auth-routes') )

module.exports = app;
