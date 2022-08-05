const User = require('../models/User');

const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const emailFormat = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

		if (!name || !email || !password) {
			return res.status(500).json({ status: 'error', error_message: 'Please fill out all fields' });
		}

		if (name.length < 3) {
			return res.status(500).json({ status: 'error', error_message: 'Name must be 3 or more characters' });
		}
		if (name.length > 50) {
			return res.status(500).json({ status: 'error', error_message: 'Name must be less than 50 characters' });
		}
		if (!email.match(emailFormat)) {
			return res.status(500).json({ status: 'error', error_message: 'Please provide a valid email address' });
		}
		if (password.length < 6) {
			return res.status(500).json({ status: 'error', error_message: 'Password must be 6 or more characters' });
		}

		const user = await User.create({ ...req.body });
		const token = user.createJWT();
		res.status(200).json({ user, token });
	} catch (error) {
		console.log(error);

		if (error.code === 11000) {
			return res.status(500).json({ status: 'error', error_message: 'Duplicate email' });
		}
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(500).json({ status: 'error', error_message: 'Please provide email and password' });
	}

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(500).json({ status: 'error', error_message: `No user found with email: ${email}` });
	}

	const isPasswordCorrect = await user.comparePasswords(password);
	if (!isPasswordCorrect) {
		return res.status(500).json({ status: 'error', error_message: 'Invalid password' });
	}

	const token = user.createJWT();
	res.status(200).json({ user, token });
};

module.exports = { register, login };
