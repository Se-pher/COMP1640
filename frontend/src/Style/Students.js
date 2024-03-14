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

export const Sidebar = styled.div`
  width: 200px;
  background-color: #29325b;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  margin-left: 20px;
  margin-bottom: 22px;
`;

export const LogoContainer = styled.div`
  margin-bottom: 20px;
`;

export const Logo = styled.img`
  width: 100px;
  height: auto;
`;

export const AdminInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

export const AdminName = styled.span`
  color: #fff;
  font-weight: bold;
`;

export const MainMenu = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const MenuTitle = styled.h3`
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const SidebarItem = styled.div`
  padding: 10px;
  cursor: pointer;
  color: #fff;
  border-radius: 10px;
  background-color: ${({ selected }) => (selected ? '#FFFFFF33' : 'initial')};
  &:hover {
    background-color: #e0e0e0;
    color: #29325b;
  }
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



