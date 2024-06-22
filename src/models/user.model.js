const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 1
  },
  email: {
    type: String,
    require: true,
    maxlength: 50,
    minlength: 10
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    default: []
  }],
  password: {
    type: String,
    require: true,
    maxlength: 50,
    minlength: 6
  },
  age: {
    type: Number,
    require: true,
    max: 120,
    min: 10
  }
})

module.exports = mongoose.model("User", userSchema)