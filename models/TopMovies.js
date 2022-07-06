const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
	movieName: {
		type: String,
		required: [ true, 'Please provide name of movie' ],
		maxLength: 50
	},
	IMDbID: {
		type: String,
		required: [ true, 'Please provide the IMDb-id for the movie' ]
	}
});

module.exports = mongoose.model('TopMovies', MovieSchema);
