const express = require('express')
const app = express()

require('dotenv').config()

//connect dbs
require('./dbs/mongo')

const bodyParser = require('body-parser');
const swagger = require('./swagger');


app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('./routes/index.route'))

swagger(app);

module.exports = app