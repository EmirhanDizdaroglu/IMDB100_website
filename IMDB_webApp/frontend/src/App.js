import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import About from './pages/About/About.js';
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register.js';
import MovieDetail from './pages/MovieDetail/MovieDetail.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
