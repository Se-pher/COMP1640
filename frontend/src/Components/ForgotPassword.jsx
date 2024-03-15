import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import * as s from '../Style/ForgotPassword';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/forgot-password', { email });
      setMessage(response.data.message);
      setError(false);
    } catch (error) {
      setMessage('Error sending password reset email');
      setError(true);
    }
  };

  return (
    <s.Container>
      <s.Title>Forgot Password</s.Title>
      <s.Form onSubmit={handleSubmit}>
        <s.Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <s.Button type="submit">Reset Password</s.Button>
      </s.Form>
      {message && <s.Message error={error}>{message}</s.Message>}
      <s.BackToLogin>
        <Link to="/login">Return to Login</Link>
      </s.BackToLogin>
    </s.Container>
  );
};

export default ForgotPassword;
