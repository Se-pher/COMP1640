import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  position: relative;
`;

export const Header = styled.div`
  position: relative;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  color: #black;
  border-radius: 10px;
  width: 70%;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 30px;
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  background-color: White;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  margin-left: 1rem;
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

export const Logo = styled.img`
  width: 50px;
  height: 50px;
`;

export const Title = styled.h2`
  margin-left: 10px;
`;

export const Navigation = styled.div`
  display: flex;
  gap: 20px;
  a {
    text-decoration: none;
    color: #000000;
    transition: color 0.3s;
    font-weight: 500;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchBar = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  margin-left: 10px;
  width: 270px;
`;

export const SignIn = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SignInLink = styled(Link)`
  text-decoration: none;
  a {
    padding: 3px 25px 3px 25px;
    font-size: 15px;
    text-decoration: none;
    color: black;
    font-weight: 500;
  }
`;

export const SignUpLink = styled(Link)`
  text-decoration: none;
  a {
    padding: 3px 25px 3px 25px;
    border-radius: 5px;
    font-size: 15px;
    text-decoration: none;
    color: black;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
