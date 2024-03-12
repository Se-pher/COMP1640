// Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import * as s from "../Style/Header";
import WebLogo from "../Image/web.png";

const Header = ({ children }) => {
  return (
    <React.Fragment>
      <s.HeaderContainer>
        <s.LeftContainer>
          <s.Logo src={WebLogo} alt="Logo" />
          <s.Navigation>
            <Link to="/">Home</Link>
            <Link to="/articles">Articles</Link>
            <Link to="/about">About</Link>
          </s.Navigation>
        </s.LeftContainer>
        <s.SearchContainer>
            <s.SearchBar type="text" placeholder="Search..." />
          </s.SearchContainer>
        <s.RightContainer>
          <s.SignIn>
            <s.SignInLink>
              <Link to="/login">Login</Link>
            </s.SignInLink>
            <s.SignUpLink>
              <Link to="/register">SignUp</Link>
            </s.SignUpLink>
          </s.SignIn>
        </s.RightContainer>
      </s.HeaderContainer>
      {children}
    </React.Fragment>
  );
};

export default Header;
