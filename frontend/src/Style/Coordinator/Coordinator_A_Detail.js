import styled from 'styled-components';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

export const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;


export const SquareContainer = styled.div`
  width: 100%;
  max-width: -webkit-fill-available;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height:635px;
  overflow:auto;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

export const ArticleList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

export const ArticleCard = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

export const ArticleHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
`;

export const ArticleTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`;

export const ArticleContent = styled.div`
  display: flex;
  width: 100%;
`;

export const ArticleDetails = styled.div`
  flex: 1;
  margin-right: 2rem;
`;

export const ArticleMetadata = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ArticleDate = styled.span`
  margin-right: 10px;
`;

export const ArticleAuthor = styled.div`
  display: flex;
  align-items: center;
`;

export const AuthorAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 5px;
`;

export const AuthorName = styled.span`
  font-weight: bold;
`;

export const ArticleDescription = styled.div`
  font-size: 1.05rem;
  line-height: 1.6;
  text-align: justify;
`;

export const ArticleImage = styled.img`
  max-width: 500px;
  object-fit: cover;
  border-radius: 5px;
  height:600px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: 2rem;
`;


export const ApprovalDropdown = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button`
  background-color: rgb(246, 121, 62);;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 8px 16px;
  z-index: 1;
`;

export const DropdownOption = styled.div`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const DropdownIcon = styled.span`
  margin-left: 4px;

  &::after {
    content: '▼';
  }
`;

export const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 20px 0; 
`;