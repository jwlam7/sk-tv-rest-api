const express = require('express');
const router = express.Router();

const { getAllComments, getComment, createComment, updateComment, deleteComment } = require('../controllers/comments');
const authenticateUser = require('../middleware/auth');

router.get('/:postId/comments', getAllComments);
router.get('/:postId/comments/:commentId', getComment);
router.post('/:postId/comments', authenticateUser, createComment);
router.patch('/:postId/comments/:commentId', authenticateUser, updateComment);
router.delete('/:postId/comments/:commentId', authenticateUser, deleteComment);

module.exports = router;
