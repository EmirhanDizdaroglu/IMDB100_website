import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <img src="imdb-logo.png" alt="IMDb Logo" />
            </div>
            <div className="menu-toggle">
                <span>Menu</span>
                <span>All</span>
                <span className="arrow-down">&#9660;</span>
            </div>
            <div className="search">
                <input type="text" placeholder="Search IMDb" />
            </div>
            <div className="watchlist">
                <span>Watchlist</span>
            </div>
            <div className="account">
                <span>John Doe</span>
                <span className="arrow-down">&#9660;</span>
                <span className="language">EN</span>
                <span className="arrow-down">&#9660;</span>
            </div>
        </header>
    );
}

export default Header;
