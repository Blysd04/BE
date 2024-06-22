const express = require('express')
const route = express.Router()

route.use('/user', require('./user.route'))
route.use('/post', require('./post.route'))

module.exports = route