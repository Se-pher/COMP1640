import React, { useState } from "react";
import * as s from "../Style/Login";
import { Link } from "react-router-dom";
import Img from "../Image/Login.png";
import GoogleLogo from "../Image/google.png";
import FBLogo from "../Image/facebook.png";
import GithubLogo from "../Image/github.png";
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", { username, password });
      console.log(response.data);
    } catch (error) {
      setError("Invalid username or password");
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
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
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
        <s.Divider>
          <s.DividerText>Or Continue with</s.DividerText>
        </s.Divider>
        <s.SocialButtonWrapper>
          <a href="/auth/google">
            <s.SocialLoginImg src={GoogleLogo} alt="Google Logo" />
          </a>
          <a href="/auth/facebook">
            <s.SocialLoginImg src={FBLogo} alt="FB Logo" />
          </a>
          <a href="/auth/github">
            <s.SocialLoginImg src={GithubLogo} alt="Github Logo" />
          </a>
        </s.SocialButtonWrapper>
        <s.SignUpLink>
          Don't have an account? <Link to="/register">Sign up here</Link>
        </s.SignUpLink>
      </s.LoginContainer>
    </s.Container>
  );
};

export default Login;
