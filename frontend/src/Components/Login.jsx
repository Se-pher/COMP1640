import React from "react";
import * as s from "../Style/Login";
import { Link } from "react-router-dom";
import Img from "../Image/Login.png";
import GoogleLogo from "../Image/google.png";
import FBLogo from "../Image/facebook.png";
import GithubLogo from "../Image/github.png";

const Login = () => {
  return (
    <s.Container>
      <s.ImageContainer>
        <s.Image src={Img} alt="Login" />
      </s.ImageContainer>
      <s.LoginContainer>
        <s.Title>Login</s.Title>
        <s.InputWrapper>
          <s.Label>Email:</s.Label>
          <s.Input name="myInput" placeholder="Input Email" />
        </s.InputWrapper>
        <s.InputWrapper>
          <s.Label>Password:</s.Label>
          <s.Input name="myInput" placeholder="Input Password" />
        </s.InputWrapper>
        <s.ForgotPassword>
          <Link to="/forgot-password">Forgot Password?</Link>
        </s.ForgotPassword>
        <s.ButtonWrapper>
          <s.button type="button">Login</s.button>
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