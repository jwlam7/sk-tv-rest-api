const Comment = require('../models/Comment');

const getAllComments = async (req, res) => {
	const { postId } = req.params;
	const comments = await Comment.find({ post: postId }).sort('createdAt');
	res.status(200).json({ comments, count: comments.length });
};
const getComment = async (req, res) => {
	const { commentId } = req.params;
	const comment = await Comment.findOne({ _id: commentId });

	if (!comment) {
		return res.status(404).json({ status: 'error', error_message: `No comment found with id: ${commentId}` });
	}

	res.status(200).json(comment);
};
const createComment = async (req, res) => {
	try {
		req.body.author = req.user.userId;
		req.body.post = req.params.postId;
		const comment = await Comment.create({ ...req.body });
		res.status(200).json(comment);
	} catch (error) {
		console.log(error);
		res.status(400).json({ status: 'error', error_message: 'Please fill out all fields' });
	}
};
const updateComment = async (req, res) => {
	try {
		const { commentId } = req.params;
		const comment = await Comment.findByIdAndUpdate({ _id: commentId }, req.body, {
			new: true,
			runValidators: true
		});

		if (!comment) {
			return res.status(404).json({ status: 'error', error_message: `No comment found with id: ${commentId}` });
		}

		res.status(200).json(comment);
	} catch (error) {
		console.log(error);
		res.status(400).json({ status: 'error', error_message: 'Please fill out all fields' });
	}
};
const deleteComment = async (req, res) => {
	const { commentId } = req.params;
	const comment = await Comment.findByIdAndRemove({ _id: commentId });

	if (!comment) {
		return res.status(404).json({ status: 'error', error_message: `No comment found with id: ${commentId}` });
	}

	res.status(200).json({ msg: 'comment deleted successfully!' });
};

module.exports = { getAllComments, getComment, createComment, updateComment, deleteComment };
