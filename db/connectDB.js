const mongoose = require('mongoose');

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

const connectDB = (uri) => mongoose.connect(uri, options);

module.exports = connectDB;
