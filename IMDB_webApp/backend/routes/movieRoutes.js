// routes/movieRoutes.js

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Tüm filmleri getiren route
router.get('/', movieController.getAllMovies);

// Yeni film ekleyen route
router.post('/', movieController.addMovie);

module.exports = router;
