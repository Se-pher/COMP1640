import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 7rem;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 2rem;
    height:auto;
  }
`;

export const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
  margin-right: 2rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  align-self: start;
`;

export const Input = styled.input`
  padding: 0.5rem;
  width: 350px;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0;
    border-color: #f6793e;
  }
  &:focus {
    outline: none;
    border-color: #f6793e;
  }

  @media (max-width: 768px) {
    width: 300px;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 1rem;
  margin-right: 1rem;
`;

export const button = styled.button`
  width: 200px;
  padding: 0.5rem;
  border-radius: 13px;
  background-color: #f6793e;
  color: White;
  border: none;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

export const ForgotPassword = styled.div`
  margin-left: 225px;
  a {
    text-decoration: none;
    color: #000000;
    transition: color 0.3s;
  }
  a:hover {
    color: #f6793e;
    text-decoration: underline;
  }
  a:visited {
    color: #f6793e;
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;