import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import imdbLogo from '../../assets/images/IMDB_Logo.png';
import imdbProLogo from '../../assets/images/IMDbPro.png';
import './Header.css';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const Header = ({ user }) => {
  const [showAll, setShowAll] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchCategory, setSearchCategory] = useState('All');
  const [watchlist, setWatchlist] = useState([]);
  const searchRef = useRef(null);
  const allToggleRef = useRef(null);
  const navigate = useNavigate();

  const toggleAll = () => {
    setShowAll(!showAll);
    setShowAccount(false);
  };

  const toggleAccount = () => {
    setShowAccount(!showAccount);
    setShowAll(false);
  };

  const fetchSearchResults = async (term) => {
    try {
      const response = await fetch('http://localhost:5000/api/movies/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchText: term, category: searchCategory }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const results = await response.json();
      setSearchResults(results.slice(0, 3)); // Show maximum of 3 results
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const debounceFetchSearchResults = debounce(fetchSearchResults, 300);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchText(term);

    if (term.length >= 3) {
      debounceFetchSearchResults(term);
    } else {
      setSearchResults([]);
    }
  };

  const handleCategoryChange = (category) => {
    setSearchCategory(category);
    setShowAll(false);
  };

  const handleClickOutside = (event) => {
    if (
      searchRef.current && !searchRef.current.contains(event.target) &&
      allToggleRef.current && !allToggleRef.current.contains(event.target)
    ) {
      setShowAll(false);
      setSearchResults([]);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
      window.location.reload();  // Sayfayı yeniden yükleyerek kullanıcı bilgilerini temizle
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    if (user) {
      const fetchWatchlist = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/watchlist/${user.uid}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setWatchlist(data);
        } catch (error) {
          console.error('Error fetching watchlist:', error);
        }
      };
      fetchWatchlist();
    }
  }, [user]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__logo">
        <img src={imdbLogo} alt="IMDb Logo" />
      </div>
      <div className="header__menu">
        <div className="hamburger-menu">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span>Menu</span>
      </div>
      <div className="header__search" ref={searchRef}>
        <div className="header__all-toggle" onClick={toggleAll} ref={allToggleRef}>
          <span>{searchCategory}</span>
          <span className={`arrow-down ${showAll ? 'active' : ''}`}>&#9660;</span>
        </div>
        {showAll && (
          <div className="header__all">
            <ul className="header__all-list">
              <li className="header__all-item" onClick={() => handleCategoryChange('All')}>All</li>
              <li className="header__all-item" onClick={() => handleCategoryChange('Titles')}>Titles</li>
              <li className="header__all-item">TV Episodes</li>
              <li className="header__all-item">Celebs</li>
              <li className="header__all-item">Companies</li>
              <li className="header__all-item">Contact</li>
            </ul>
          </div>
        )}
        <input type="text" placeholder="Search IMDb" value={searchText} onChange={handleSearch} />
        {searchText.length >= 3 && (
          <div className="header__search-results">
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>
                  {result.title ? (
                    <>
                      <strong>{result.title}</strong>
                      <p>{result.summary}</p>
                      <p>Actors: {result.actors}</p>
                    </>
                  ) : (
                    <strong>{result.actor_name}</strong>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="header__extras">
        <div className="header__imdb-pro" style={{ paddingRight: '16px' }}>
          <img src={imdbProLogo} alt="IMDbPro" />
        </div>

        {user ? (
          <div className="header__account">
            <span>{user.displayName}&nbsp;</span>
            <span className={`arrow-down ${showAccount ? 'active' : ''}`} onClick={toggleAccount}>&#9660;</span>
            {showAccount && (
              <div className="header__dropdown">
                <div className="header__all">
                  <ul className="header__all-list">
                    <li className="header__all-item">Your activity</li>
                    <li className="header__all-item">Your watchlist</li>
                    <li className="header__all-item">Your ratings</li>
                    <li className="header__all-item">Your lists</li>
                    <li className="header__all-item">Your settings</li>
                    <li className="header__all-item" onClick={handleSignOut}>Sign out</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="header__login">
            Sign In
          </Link>
        )}

        <LanguageSwitcher />
      </div>
    </header>
  );
};

// Debounce function to limit the rate of API calls
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default Header;
