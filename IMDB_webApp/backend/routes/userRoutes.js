const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:userId/watchlist', userController.getWatchlist);
// Örnek korunan rota
router.get('/profile', authMiddleware, (req, res) => {
    res.send({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
