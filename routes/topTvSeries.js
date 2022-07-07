const express = require('express');
const router = express.Router();
const getTopTvSeries = require('../controllers/topTvSeries');

router.get('/', getTopTvSeries);

module.exports = router;
