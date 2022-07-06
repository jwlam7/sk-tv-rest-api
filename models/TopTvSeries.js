const mongoose = require('mongoose');

const TvSchema = new mongoose.Schema({
	tvName: {
		type: String,
		required: [ true, 'Please provide name of tv-series' ],
		maxLength: 50
	},
	IMDbID: {
		type: String,
		required: [ true, 'Please provide the IMDb-id for the tv-series' ]
	}
});

module.exports = mongoose.model('TopTvSeries', TvSchema);
