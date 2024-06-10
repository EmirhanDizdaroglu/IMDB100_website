import React from 'react';
import Register from '../../components/Register';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
