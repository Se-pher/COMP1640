import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #F6793E;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Message = styled.p`
  margin-top: 1rem;
  font-weight: bold;
  color: ${({ error }) => (error ? 'red' : 'green')};
`;

export const BackToLogin = styled.div`
  margin-top: 20px; 
  font-size: 14px;
  a {
    text-decoration: none;
    color: #000000;
    transition: color 0.3s;
  }

  a:hover {
    color: #F6793E;
    text-decoration: underline;
  }

  a:visited{
    color: #F6793E;
  }

`;