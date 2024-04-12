import React, { useState } from "react";
import * as s from "../Style/Login";
import { Link, useNavigate } from "react-router-dom";
import Img from "../Image/Login.png";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });
      const { user, token } = response.data;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userRole', user.role);

      if (user.role === 'Student') {
        navigate('/student');
      } else if (user.role === 'Admin') {
        navigate('/admin');
      } else if (user.role === 'Manager') {
        navigate('/manager');
      } else if (user.role === 'Coordinator') {
        navigate('/coordinator');
      } else if (user.role === 'Guest') {
        navigate('/home');
        
      } else {
        setError('Invalid role');
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <s.Container>
      <s.ImageContainer>
        <s.Image src={Img} alt="Login" />
      </s.ImageContainer>
      <s.LoginContainer>
        <s.Title>Login</s.Title>
        <s.InputWrapper>
          <s.Label>Email:</s.Label>
          <s.Input
            name="email"
            placeholder="Input Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </s.InputWrapper>
        <s.InputWrapper>
          <s.Label>Password:</s.Label>
          <s.Input
            name="password"
            type="password"
            placeholder="Input Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </s.InputWrapper>
        <s.ForgotPassword>
          <Link to="/forgot-password">Forgot Password?</Link>
        </s.ForgotPassword>
        <s.ButtonWrapper>
          <s.button type="button" onClick={handleLogin}>Login</s.button>
          {error && <div>{error}</div>}
        </s.ButtonWrapper>
      </s.LoginContainer>
    </s.Container>
  );
};

export default Login;