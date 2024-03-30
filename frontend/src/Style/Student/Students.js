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
  width: 100%;
  height: 650px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  border-radius: 10px;
  padding-bottom: 20px;
  max-width: -webkit-fill-available;
  overflow: auto;
`;

export const TitleHeader = styled.div`
  font-size: 24px;
  margin-top: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

export const DropzoneContainer = styled.div`
  border: 2px dashed #ccc;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s ease;
  width: 570px;

  &:hover {
    border-color: #999;
  }

  p {
    margin: 0;
  }
`;

export const UploadedFileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc; 
  padding: 10px;
  border-radius: 5px;
`;

export const FileName = styled.span`
  font-size: 14px;
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap; 
  text-overflow: ellipsis;
`;

export const ProgressBar = styled.div`
  width: 200px;
  height: 10px;
  background-color: black;
  border-radius: 5px;
`;

export const ProgressValue = styled.div`
  height: 100%;
  background-color: #4caf50;
`;

export const UploadedIcon = styled.span`
  font-size: 16px;
  color: #4caf50;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #f44336;
  cursor: pointer;
  margin-left: auto; 
`;

export const UploadedFilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;
