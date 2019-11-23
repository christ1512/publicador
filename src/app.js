const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

//settings
app.set('port',process.env.PORT||4000)
//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//routes
app.use( require('./routers/index') );

module.exports = app