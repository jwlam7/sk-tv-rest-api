const TopTvSeries = require('../models/TopTvSeries');

const getTopTvSeries = async (req, res) => {
	const data = await TopTvSeries.find({});
	const tvObj = data.reduce((obj, { tvName, IMDbID }) => ((obj[tvName] = IMDbID), obj), {});
	res.status(200).json(tvObj);
};

module.exports = getTopTvSeries;
