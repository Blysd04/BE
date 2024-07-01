const express = require('express')
const router = express.Router()
const { createPost, getAllPosts, getPostByIdUser, updatePostById, deletePostById } = require('../controllers/post.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - userId
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           format: objectid
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         userId:
 *           type: string
 *           format: objectid
 *           description: The ID of the user who created the blog post
 *         category:
 *           type: string
 *           enum:
 *             - Technology
 *             - Travel
 *             - Food
 *             - Fashion
 *             - Health
 *           description: The category of the post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the blog post was created
 *           example: 2024-06-28T14:20:00Z
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         title: Introduction to Swagger
 *         content: This is a blog post about how to use Swagger in your project.
 *         category: Technology
 *         userId: 60d0fe4f5311236168a109cb
 *         createdAt: 2024-06-28T14:20:00Z
 */

/**
 * @swagger
 * /post/v1/created/{id}:
 *   post:
 *     summary: Creates a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.post('/v1/create/:id', createPost)

/**
 * @swagger
 * /post/v1:
 *   get:
 *     summary: Retrieves a list of posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/v1', getAllPosts)

/**
 * @swagger
 * /post/v1/{id}:
 *   get:
 *     summary: Get a post by userId
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The userId
 *     responses:
 *       200:
 *         description: The post description by userId
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post(s) not found
 */
router.get('/v1/:idUser', getPostByIdUser)

/**
 * @swagger
 * /post/v1/{id}:
*   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
router.put('/v1/:id', updatePostById)

/**
 * @swagger
 * /post/v1/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: The post was deleted
 *       404:
 *         description: post not found
 */
router.delete('/v1/:id', deletePostById)

module.exports = router