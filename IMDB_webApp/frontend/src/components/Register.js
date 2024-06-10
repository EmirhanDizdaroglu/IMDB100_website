import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Auth.css';

const Register = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(t('passwordsDoNotMatch'));
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert(t('registrationSuccessful'));
      navigate('/login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert(t('emailAlreadyInUse'));
      } else {
        console.error(t('errorRegistering'), error);
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister}>
        <label>
          {t('email')}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          {t('password')}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          {t('confirmPassword')}
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <label>
          {t('country')}
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
        </label>
        <label>
          {t('city')}
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <button type="submit">{t('register')}</button>
      </form>
      <button className="switch-button" onClick={() => navigate('/login')}>{t('login')}</button>
    </div>
  );
};

export default Register;
