const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: [ true, 'Please provide text' ]
		},
		author: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true
		},
		post: {
			type: mongoose.Types.ObjectId,
			ref: 'Post',
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
