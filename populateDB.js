require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db/connectDB');

const TopMovies = require('./models/TopMovies');
const topMoviesJSON = require('./topMovies.json');

const TopTvSeries = require('./models/TopTvSeries');
const topTvSeriesJSON = require('./topTvSeries.json');

// const populateTopMovies = async () => {
// 	try {
// 		await connectDB(process.env.MONGODB_URI);
// 		await TopMovies.deleteMany();
// 		await TopMovies.create(topMoviesJSON);
// 		console.log('popluated movies data');
// 		process.exit(0);
// 	} catch (error) {
// 		console.log(error);
// 		process.exit(1);
// 	}
// };

// populateTopMovies();

const populateTopTvSeries = async () => {
	try {
		await connectDB(process.env.MONGODB_URI);
		await TopTvSeries.deleteMany();
		await TopTvSeries.create(topTvSeriesJSON);
		console.log('popluated tv series data');
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

populateTopTvSeries();
