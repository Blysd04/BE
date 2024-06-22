const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    minlength: 10,
    maxlength: 100
  },
  content: {
    type: String,
    require: true,
    minlength: 10,
    maxlength: 500
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  category: {
    type: String,
    enum: ['Technology', 'Travel', 'Food', 'Fashion', 'Health'],
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Post", postSchema)