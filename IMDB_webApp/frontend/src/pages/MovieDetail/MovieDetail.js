import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './MovieDetail.css';

const MovieDetail = () => {
  const { movieId } = useParams();
  const { t } = useTranslation();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/movies/${movieId}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError(t('errorFetchingMovieDetails'));
      }
    };
    fetchMovie();
  }, [movieId, t]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>{t('loading')}</p>;
  }

  return (
    <div className="movie-detail">
      <div className="movie-detail__header">
        <h1>{movie.title}</h1>
        <div className="movie-detail__rating">
          <span>{t('imdbRating')}: {movie.imdb_score}</span>
          <span>{t('popularity')}: {movie.popularity}</span>
        </div>
      </div>
      <div className="movie-detail__content">
        <img src={require(`../../assets/images/${movie.movie_id}.png`)} alt={`Movie ${movie.movie_id}`} className="movie-detail__image" />
        <div className="movie-detail__video-container">
          <video className="movie-detail__video" controls>
            <source src={movie.trailer_url} type="video/mp4" />
            {t('videoNotSupported')}
          </video>
        </div>
      </div>
      <div className="movie-detail__info">
        <p>{movie.summary}</p>
        <p>{t('actors')}: {movie.actors}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
