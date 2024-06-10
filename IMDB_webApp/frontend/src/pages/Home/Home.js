import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../App.css';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movies/top');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching top movies:', error);
        setError(t('errorFetchingMovies'));
      }
    };
  
    fetchMovies();
  }, [t]);

  const handleAddToWatchlist = async (movieId) => {
    try {
      const response = await fetch('http://localhost:5000/api/movies/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 1, movieId }),  // Replace 1 with actual userId
      });
      if (response.ok) {
        alert(t('movieAddedToWatchlist'));
      } else {
        throw new Error(t('failedToAddMovie'));
      }
    } catch (error) {
      console.error(t('errorAddingMovie'), error);
    }
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="home" style={{ backgroundColor: '#121212' }}>
      <h2>{t('topMovies')}</h2>
      {error && <p>{error}</p>}
      <Slider {...settings} ref={sliderRef}>
        {movies.map((movie, index) => (
          <div key={index} className="movie-card" onClick={() => handleMovieClick(movie.movie_id)}>
            <img src={require(`../../assets/images/${movie.movie_id}.png`)} alt={`Movie ${movie.movie_id}`} />
            <h3>{movie.title}</h3>
            <p>{t('rating')}: {Number(movie.imdb_score).toFixed(1)}</p>
            <button onClick={(e) => { e.stopPropagation(); handleAddToWatchlist(movie.movie_id); }}>{t('addToWatchlist')}</button>
            <a href={movie.trailer_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>{t('trailer')}</a>
          </div>
        ))}
      </Slider>
      <div className="slider-buttons">
        <button onClick={prevSlide}>{t('previous')}</button>
        <button onClick={nextSlide}>{t('next')}</button>
      </div>
    </div>
  );
};

export default Home;
