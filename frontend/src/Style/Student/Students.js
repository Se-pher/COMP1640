import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #EAEBEF;
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  margin-top: 20px;
`;

export const Main = styled.div`
  flex: 1;
  padding: 20px;
  margin-right: 20px;
  margin-top: 50px;
`;

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

export const SquareContainer = styled.div`
  width: 1100px;
  height: 650px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  border-radius: 10px;
  padding-bottom: 20px;
`;

export const TitleHeader = styled.div`
  font-size: 24px;
  margin-top: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
`;

export const Label = styled.label`
    margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 600px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
`;

export const TextArea = styled.textarea`
  width: 600px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
  resize: vertical;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 30px;
`;

export const AddMoreArticlesButton = styled.button`
  background-color: #F6793E;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

export const UploadArticlesButton = styled.button`
  background-color: #F6793E;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;



