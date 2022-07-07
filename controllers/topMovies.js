const TopMovies = require('../models/TopMovies');

const getTopMovies = async (req, res) => {
	const data = await TopMovies.find({});
	const moviesObj = data.reduce((obj, { movieName, IMDbID }) => ((obj[movieName] = IMDbID), obj), {});
	res.status(200).json(moviesObj);
};

module.exports = getTopMovies;
