const postModel = require('../models/post.model')
const userModel = require('../models/user.model')

const createPost = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content, category } = req.body
    let errors = []
    if (req.body.hasOwnProperty('content')) {
      if (content.length > 500 || content.length < 10) {
        errors.push("Content's length has to be between 10 and 500!")
      }
    } else if (!req.body.hasOwnProperty('content')) {
      errors.push("Content is required!")
    }

    if (req.body.hasOwnProperty('title')) {
      if (title.length > 100 || title.length < 10) {
        errors.push("Title's length has to be between 10 and 100!")
      }
    } else if (!req.body.hasOwnProperty('title')) {
      errors.push("Title is required!")
    }

    if (req.body.hasOwnProperty('category')) {
      if (category !== "Technology" && category !== "Travel" && category !== "Food" && category !== "Fashion" && category !== "Health") {
        errors.push("Category invalid")
      }
    } else if (!req.body.hasOwnProperty('category')) {
      errors.push("Category is required!")
    }
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const post = await postModel.create({ title: title, content: content, userId: id, category: category })
    const user = await userModel.findByIdAndUpdate(id, { $push: { posts: post._id } }, { new: true });
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

const getAllPosts = async (req, res) => {
  try {
    const post = await postModel.find()
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

const getPostByIdUser = async (req, res) => {
  try {
    const { idUser } = req.params
    const post = await postModel.find({ userId: idUser })
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

const updatePostById = async (req, res) => {
  try {
    const { id } = req.params
    let { userId, createdAt, ...updateData } = req.body

    let errors = []
    if (req.body.hasOwnProperty('content')) {
      if (updateData.content.length > 500 || updateData.content.length < 10) {
        errors.push("Content's length has to be between 10 and 500!")
      }
    }

    if (req.body.hasOwnProperty('title')) {
      if (updateData.title.length > 100 || updateData.title.length < 10) {
        errors.push("Title's length has to be between 10 and 100!")
      }
    }

    if (req.body.hasOwnProperty('category')) {
      if (updateData.category !== "Technology" && updateData.category !== "Travel" && updateData.category !== "Food" && updateData.category !== "Fashion" && updateData.category !== "Health") {
        errors.push("Category invalid")
      }
    }

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const post = await postModel.findByIdAndUpdate(id, updateData)
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

const deletePostById = async (req, res) => {
  try {
    const { id } = req.params
    const post = await postModel.findById(id);
    if (!post) {
      res.status(200).json("Post not found!")
    } else {
      const userId = post.userId
      const user = await userModel.findByIdAndUpdate(userId, { $pull: { posts: id } }, { new: true });
      const postDelete = await postModel.findByIdAndDelete(id)
      if (!postDelete) {
        res.status(200).json("Post not found!")
      } else {
        res.status(200).json("Post deleted!")
      }
    }
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

module.exports = { createPost, getAllPosts, getPostByIdUser, updatePostById, deletePostById }