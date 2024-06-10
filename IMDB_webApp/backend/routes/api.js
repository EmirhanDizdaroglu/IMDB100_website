const express = require('express');
const router = express.Router();
const movieRoutes = require('./movieRoutes');

// Film rotalarını kullan
router.use('/movies', movieRoutes);

module.exports = router;
