const Movie = require('./movies');

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
