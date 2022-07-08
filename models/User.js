const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'Please provide username' ],
		minLength: 3,
		maxLength: 50
	},
	email: {
		type: String,
		required: [ true, 'Please provide email' ],
		match: [ /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Please provide a valid email' ],
		unique: true
	},
	password: {
		type: String,
		required: [ true, 'Please provide password' ],
		minLength: 6
	}
});

module.exports = mongoose.model('User', UserSchema);
