const Post = require('../models/Post');

const getAllPosts = async (req, res) => {
	const posts = await Post.find({}).sort('createdAt');
	res.status(200).json({ posts, count: posts.length });
};
const getPost = async (req, res) => {
	const { postId } = req.params;
	const post = await Post.findOne({ _id: postId });

	if (!post) {
		return res.status(500).json({ status: 'error', error_message: `No post found with id: ${postId}` });
	}

	res.status(200).json(post);
};
const createPost = async (req, res) => {
	try {
		req.body.author = req.user.userId;
		const post = await Post.create({ ...req.body });
		res.status(200).json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 'error', error_message: 'Please fill out all fields' });
	}
};
const updatePost = async (req, res) => {
	try {
		const { postId } = req.params;
		const post = await Post.findByIdAndUpdate({ _id: postId }, req.body, { new: true, runValidators: true });

		if (!post) {
			return res.status(500).json({ status: 'error', error_message: `No post found with id: ${postId}` });
		}

		res.status(200).json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 'error', error_message: 'Please fill out all fields' });
	}
};
const deletePost = async (req, res) => {
	const { postId } = req.params;
	const post = await Post.findByIdAndRemove({ _id: postId });

	if (!post) {
		return res.status(500).json({ status: 'error', error_message: `No post found with id: ${postId}` });
	}

	res.status(200).json({ msg: 'post deleted successfully!' });
};

module.exports = { getAllPosts, getPost, createPost, updatePost, deletePost };
