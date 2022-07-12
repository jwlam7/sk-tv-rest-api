const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [ true, 'Please provide title' ],
			maxLength: 100
		},
		text: {
			type: String,
			required: [ true, 'Please provide text' ]
		},
		author: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
