const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// En iyi 10 filmi getiren route
router.get('/top', movieController.getTop10Movies);

// Tüm filmleri getiren route
router.get('/all', movieController.getAllMovies);

// Arama yapma route
router.post('/search', movieController.searchMovies);

// İzleme listesine film ekleyen route
router.post('/watchlist', movieController.addToWatchlist);

// Filmde oynayan aktörleri getiren route
router.get('/actors/:movieId', movieController.getActorsInMovie);

// Film yorumlarını getiren route
router.get('/reviews/:movieId', movieController.getReviewsOfMovie);

// Film puanı verme route
router.post('/rate', movieController.rateMovie);

// Belirli bir film detaylarını getiren route
router.get('/:movieId', movieController.getMovieById);

module.exports = router;
