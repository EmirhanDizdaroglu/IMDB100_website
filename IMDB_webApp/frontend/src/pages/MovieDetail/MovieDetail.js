import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // API'den veri çekmek için axios kullanımı
    axios.get('http://localhost:3000/api/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the movies!', error);
      });
  }, []);

  return (
    <div>
      <h1>Movies List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.movie_id}>{movie.title} ({movie.release_year})</li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
