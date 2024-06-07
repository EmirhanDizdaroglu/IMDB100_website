const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');

// Kullanıcı kayıt ve giriş rotaları


// Film rotaları
router.get('/movies', movieController.getAllMovies);


module.exports = router;
