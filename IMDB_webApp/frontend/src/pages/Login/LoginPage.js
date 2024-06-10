import React from 'react';
import Login from '../../components/Login';
import './LoginPage.css';

const LoginPage = ({ setUser }) => {
  return (
    <div className="login-page">
      <div className="login-container">
        <Login setUser={setUser} />
      </div>
    </div>
  );
};

export default LoginPage;
