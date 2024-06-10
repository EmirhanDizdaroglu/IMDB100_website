import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import Header from './pages/Header/Header';
import Footer from './pages/Footer/Footer';
import './App.css';
import LanguageSwitcher from './components/LanguageSwitcher';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import './i18n'; // i18n yapılandırma dosyasını import edin
import { auth } from './firebase'; // Firebase auth import

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Header user={user} />
      <LanguageSwitcher /> {/* Dil değiştirme bileşenini ekleyin */}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Diğer sayfaları buraya ekleyin */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
