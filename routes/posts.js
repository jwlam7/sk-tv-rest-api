const express = require('express');
const router = express.Router();

const { getAllPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/posts');
const authenticateUser = require('../middleware/auth');

router.get('/', getAllPosts);
router.get('/:postId', getPost);
router.post('/', authenticateUser, createPost);
router.patch('/:postId', authenticateUser, updatePost);
router.delete('/:postId', authenticateUser, deletePost);

module.exports = router;
