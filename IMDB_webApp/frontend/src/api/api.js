import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// En iyi 10 filmi getiren fonksiyon
export const fetchTopMovies = () => API.get('/top-movies');

// İzleme listesine film ekleyen fonksiyon
export const addToWatchlist = (userId, movieId) => API.post('/watchlist', { userId, movieId });

// Tüm filmleri getiren fonksiyon
export const fetchAllMovies = () => API.get('/all');

// Filmlerde arama yapan fonksiyon
export const searchMovies = (searchText, category) => API.post('/search', { searchText, category });

// Filmde oynayan aktörleri getiren fonksiyon
export const getActorsInMovie = (movieId) => API.get(`/actors/${movieId}`);

// Film yorumlarını getiren fonksiyon
export const getReviewsOfMovie = (movieId) => API.get(`/reviews/${movieId}`);

// Film puanı verme fonksiyonu
export const rateMovie = (userId, movieId, rating) => API.post('/rate', { userId, movieId, rating });
