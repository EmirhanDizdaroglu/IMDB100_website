const connectToDatabase = require('../config/db');

// Get all movies
exports.getAllMovies = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const query = `
            SELECT movie_id, title, imdb_score, trailer_url
            FROM movies
        `;
        const [movies] = await db.query(query);
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error in getAllMovies:', error);
        res.status(500).json({ error: error.message });
    }
};

// Search movies, summaries, and actors
exports.searchMovies = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { searchText, category } = req.body;
        let query;
        let params = [`%${searchText}%`, `%${searchText}%`, `%${searchText}%`];

        console.log('Search Text:', searchText);
        console.log('Category:', category);

        switch (category) {
            case 'Titles':
                query = `
                    SELECT 
                        movies.movie_id, 
                        movies.title, 
                        movies.summary, 
                        movies.release_year, 
                        movies.genre, 
                        movies.duration, 
                        movies.imdb_score, 
                        movies.trailer_url,
                        GROUP_CONCAT(actors.name SEPARATOR ', ') AS actors
                    FROM movies
                    LEFT JOIN film_actors ON movies.movie_id = film_actors.movie_id
                    LEFT JOIN actors ON film_actors.actor_id = actors.actor_id
                    WHERE movies.title LIKE ?
                    GROUP BY movies.movie_id
                `;
                params = [`%${searchText}%`];
                break;
            case 'All':
            default:
                query = `
                    SELECT 
                        movies.movie_id, 
                        movies.title, 
                        movies.summary, 
                        movies.release_year, 
                        movies.genre, 
                        movies.duration, 
                        movies.imdb_score, 
                        movies.trailer_url,
                        GROUP_CONCAT(actors.name SEPARATOR ', ') AS actors,
                        NULL AS actor_name,
                        NULL AS movies
                    FROM movies
                    LEFT JOIN film_actors ON movies.movie_id = film_actors.movie_id
                    LEFT JOIN actors ON film_actors.actor_id = actors.actor_id
                    WHERE movies.title LIKE ? OR movies.summary LIKE ?
                    GROUP BY movies.movie_id
                    UNION
                    SELECT 
                        NULL AS movie_id, 
                        NULL AS title, 
                        NULL AS summary, 
                        NULL AS release_year, 
                        NULL AS genre, 
                        NULL AS duration, 
                        NULL AS imdb_score, 
                        NULL AS trailer_url,
                        NULL AS actors,
                        actors.name AS actor_name,
                        GROUP_CONCAT(movies.title SEPARATOR ', ') AS movies
                    FROM actors
                    LEFT JOIN film_actors ON actors.actor_id = film_actors.actor_id
                    LEFT JOIN movies ON film_actors.movie_id = movies.movie_id
                    WHERE actors.name LIKE ?
                    GROUP BY actors.actor_id
                `;
                break;
        }

        console.log('Query:', query);
        console.log('Params:', params);

        const [results] = await db.query(query, params);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error in searchMovies:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get top 10 movies with details
exports.getTop10Movies = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const query = `
            SELECT movie_id, title, imdb_score
            FROM movies
            ORDER BY imdb_score DESC
            LIMIT 10
        `;
        const [movies] = await db.query(query);
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error in getTop10Movies:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get reviews of a movie
exports.getReviewsOfMovie = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { movieId } = req.params;
        const query = `SELECT * FROM reviews WHERE movie_id = ?`;
        const [reviews] = await db.query(query, [movieId]);
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error in getReviewsOfMovie:', error);
        res.status(500).json({ error: error.message });
    }
};

// Rate a movie
exports.rateMovie = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { userId, movieId, rating } = req.body;
        const query = `
            INSERT INTO ratings (user_id, movie_id, rating)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE rating = VALUES(rating)
        `;
        await db.query(query, [userId, movieId, rating]);
        res.status(200).json({ message: 'Movie rated successfully' });
    } catch (error) {
        console.error('Error in rateMovie:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get actors in a movie
exports.getActorsInMovie = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { movieId } = req.params;
        const query = `
            SELECT 
                a.actor_id, 
                a.name AS real_name, 
                fa.character_name
            FROM film_actors fa
            JOIN actors a ON fa.actor_id = a.actor_id
            WHERE fa.movie_id = ?
        `;
        const [actors] = await db.query(query, [movieId]);
        res.status(200).json(actors);
    } catch (error) {
        console.error('Error in getActorsInMovie:', error);
        res.status(500).json({ error: error.message });
    }
};

// Add movie to watchlist
exports.addToWatchlist = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { userId, movieId } = req.body;
        const query = `INSERT INTO watchlist (user_id, movie_id) VALUES (?, ?)`;
        await db.query(query, [userId, movieId]);
        res.status(201).json({ message: 'Movie added to watchlist successfully' });
    } catch (error) {
        console.error('Error in addToWatchlist:', error);
        res.status(500).json({ error: error.message });
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
// Get movie details by ID
exports.getMovieById = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { movieId } = req.params;
        const query = `
            SELECT 
                movies.movie_id, 
                movies.title, 
                movies.summary, 
                movies.release_year, 
                movies.genre, 
                movies.duration, 
                movies.imdb_score, 
                movies.trailer_url,
                GROUP_CONCAT(actors.name SEPARATOR ', ') AS actors,
                NULL AS actor_name,
                NULL AS movies
            FROM movies
            LEFT JOIN film_actors ON movies.movie_id = film_actors.movie_id
            LEFT JOIN actors ON film_actors.actor_id = actors.actor_id
            WHERE movies.movie_id = ?
            GROUP BY movies.movie_id
        `;
        const [movie] = await db.query(query, [movieId]);
        res.status(200).json(movie[0]);
    } catch (error) {
        console.error('Error in getMovieById:', error);
        res.status(500).json({ error: error.message });
    }
};