import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Auth.css';

const Login = ({ setUser }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/');
    } catch (error) {
      console.error(t('errorLoggingIn'), error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      setUser(userCredential.user);
      navigate('/');
    } catch (error) {
      console.error(t('errorLoggingInWithGoogle'), error);
    }
  };

  return (
    <div className="auth-container">
      <button onClick={handleGoogleLogin} className="google-btn">{t('loginWithGoogle')}</button>
      <form onSubmit={handleLogin}>
        <label>
          {t('email')}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          {t('password')}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">{t('login')}</button>
      </form>
      <button className="switch-button" onClick={() => navigate('/register')}>{t('register')}</button>
    </div>
  );
};

export default Login;
