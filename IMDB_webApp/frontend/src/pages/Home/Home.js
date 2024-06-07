import React, { useEffect, useState } from 'react';
import api from '../../api/api.js';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/movies')
      .then(response => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setError('An error occurred while fetching movies. Please try again later.');
        setLoading(false);
      });
  }, [movies]); // Trigger the effect whenever `movies` change

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.length > 0 ? (
          movies.map(movie => (
            <li key={movie.movie_id}>{movie.title}</li>
          ))
        ) : (
          <li>No movies found</li>
        )}
      </ul>
    </div>
  );
};

export default Home;
