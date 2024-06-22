const express = require('express')
const router = express.Router()
const { createPost, getAllPosts, getPostByIdUser, updatePostById, deletePostById } = require('../controllers/post.controller')

router.post('/v1/create/:id', createPost)
router.get('/v1', getAllPosts)
router.get('/v1/:idUser', getPostByIdUser)
router.put('/v1/:id', updatePostById)
router.delete('/v1/:id', deletePostById)

module.exports = router