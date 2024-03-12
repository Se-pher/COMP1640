import React from "react";
import * as s from "../Style/Register";
import { Link } from "react-router-dom";
import Img from "../Image/Login.png";
import GoogleLogo from "../Image/google.png";
import FBLogo from "../Image/facebook.png";
import GithubLogo from "../Image/github.png";

const Register = () => {
  return (
    <s.Container>
      <s.ImageContainer>
        <s.Image src={Img} alt="Register" />
      </s.ImageContainer>
      <s.RegisterContainer>
        <s.Title>Register</s.Title>
        <s.InputWrapper>
          <s.Label>Username:</s.Label>
          <s.Input name="username" placeholder="Input Username" />
        </s.InputWrapper>
        <s.InputWrapper>
          <s.Label>Email:</s.Label>
          <s.Input name="email" placeholder="Input Email" />
        </s.InputWrapper>
        <s.InputWrapper>
          <s.Label>Password:</s.Label>
          <s.Input name="password" placeholder="Input Password" />
        </s.InputWrapper>
        <s.ButtonWrapper>
          <s.button type="button">Register</s.button>
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
        <s.RegisterLink>
          Have an account? <Link to="/login">Login here</Link>
        </s.RegisterLink>
      </s.RegisterContainer>
    </s.Container>
  );
};

export default Register;