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

export const LogoutButton = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

export const LogoutBtn = styled.button`
  background-color: #F6793E;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  width: 150px;
`;

export const LogoutIcon = styled(FontAwesomeIcon).attrs({
  icon: faRightFromBracket,
})`
  margin-right: 5px;
`;

export const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  margin-bottom: 2rem;
`;

export const ArticleCard = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  height: 250px;
`;

export const Pagination = styled.div`
  position: fixed; 
  bottom: 20px; 
  left: 50%; 
  transform: translateX(30%); 
  display: flex;
  justify-content: center;

  button {
    background-color: #f2f2f2;
    border: none;
    color: #333;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1rem;
    margin: 0 0.25rem;
    cursor: pointer;
    border-radius: 4px;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

export const ArticleImage = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-radius: 10px;
`;

export const ArticleInfo = styled.div`
  padding: 1rem;
  padding-top: 0px;
`;

export const ArticleDate = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 1px;
`;

export const ArticleTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

export const ArticleDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
`;

export const ArticleAuthor = styled.div`
  display: flex;
  align-items: center;
`;

export const AuthorAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

export const CoordinatorArticleCard = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  height: 290px;
  display: flex;
  flex-direction: column;

`;