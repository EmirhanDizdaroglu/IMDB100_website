const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../config/db');

exports.register = async (req, res) => {
    const { uid, email, country, city } = req.body;
    try {
        const query = 'INSERT INTO users (uid, email, country, city) VALUES (?, ?, ?, ?)';
        const db = await connectToDatabase();
        await db.query(query, [uid, email, country, city]);
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const query = 'SELECT * FROM users WHERE email = ?';
        const db = await connectToDatabase();
        const [users] = await db.query(query, [email]);
        if (users.length === 0) {
            return res.status(404).send({ error: 'User not found' });
        }
        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).send({ error: 'Invalid password' });
        }
        const token = jwt.sign({ id: user.user_id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).send({ token, user });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Get user's watchlist
exports.getWatchlist = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { userId } = req.params;
        const query = `SELECT * FROM watchlist WHERE user_id = ?`;
        const [watchlist] = await db.query(query, [userId]);
        res.status(200).json(watchlist);
    } catch (error) {
        console.error('Error in getWatchlist:', error);
        res.status(500).json({ error: error.message });
    }
};
