// backend/controllers/movieController.js

const db = require('../config/db');

exports.getAllMovies = async (req, res) => {
    try {
        const [movies] = await db.query('SELECT * FROM movies');
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
