const express = require('express')
const router = express.Router()
const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/user.controller')

router.post('/v1/create', createUser)
router.get('/v1', getAllUsers)
router.get('/v1/:id', getUserById)
router.put('/v1/:id', updateUserById)
router.delete('/v1/:id', deleteUserById)

module.exports = router