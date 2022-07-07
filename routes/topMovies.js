const express = require('express');
const router = express.Router();
const getTopMovies = require('../controllers/topMovies');

router.get('/', getTopMovies);

module.exports = router;
