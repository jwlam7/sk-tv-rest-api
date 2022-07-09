const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

//hash the user password before saving to the database
UserSchema.pre('save', async function() {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

//returns a boolean for whether the password the user typed in matches the password in the database
UserSchema.methods.comparePasswords = async function(userPassword) {
	const isMatch = await bcrypt.compare(userPassword, this.password);
	return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
