const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer')) {
		return res.json({ status: 'error', error_message: 'Authentication invalid' });
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { userId, name } = decoded;
		req.user = { userId, name };
		next();
	} catch (error) {
		console.log(error);
		res.json({ status: 'error', error_message: 'Invalid token' });
	}
};

module.exports = verifyToken;
