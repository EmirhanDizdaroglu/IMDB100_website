import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="language-switcher">
      <div className="selected-language" onClick={toggleDropdown}>
        {i18n.language.toUpperCase()} <span className={`arrow-down ${showDropdown ? 'active' : ''}`}>&#9660;</span>
      </div>
      {showDropdown && (
        <div className="language-menu">
          <button onClick={() => changeLanguage('en')}>EN</button>
          <button onClick={() => changeLanguage('tr')}>TR</button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
