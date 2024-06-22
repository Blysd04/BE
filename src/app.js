const express = require('express')
const app = express()

require('dotenv').config()

//connect dbs
require('./dbs/mongo')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('./routes/index.route'))

module.exports = app