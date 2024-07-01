const express = require('express')
const router = express.Router()
const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/user.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - age
 *       properties:
 *         id: 
 *           type: string
 *           format: objectid
 *           description: The id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         posts:
 *           type: array
 *           forrmat: objectid
 *           description: The posts of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         age:
 *           type: integer
 *           description: The age of the user
 *       example:
 *         _id: 60d0fe4f5311236168a109cb
 *         name: John Doe
 *         email: johndoe@gmail.com
 *         password: password123
 *         posts: [60d0fe4f5311236168a109ca]
 *         age: 25
 */

/**
 * @swagger
 * /user/v1/create:
 *   post:
 *     summary: Creates a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/v1/create', createUser)

/**
 * @swagger
 * /user/v1:
 *   get:
 *     summary: Get All users
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/v1', getAllUsers)

/**
 * @swagger
 * /user/v1/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */

router.get('/v1/:id', getUserById)

/**
 * @swagger
 * /users/v1/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.put('/v1/:id', updateUserById)

/**
 * @swagger
 * /users/v1/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: User not found
 */
router.delete('/v1/:id', deleteUserById)

module.exports = router