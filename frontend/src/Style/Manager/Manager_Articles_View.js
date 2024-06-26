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

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 0;
  }
`;

export const Main = styled.div`
  flex: 1;
  padding: 20px;
  margin-right: 20px;
  margin-top: 50px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-top: 20px;
    padding: 10px;
  }
`;

export const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;


export const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    margin-top:60px;
  }
`;

export const ArticleCard = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  height: 250px;

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const Pagination = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
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

  @media (max-width: 768px) {
    position: relative;
    div {
      font-size: 0.8rem;
      padding: 0.3rem 0.8rem;
    }
  }
`;

export const ArticleImage = styled.img`
  width: 100%;
  height: 120px;
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

export const ManagerCard = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  height: 290px;
  display: flex;
  flex-direction: column;
  width: 340px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

export const SelectionCheckbox = styled.div`

`;

export const DownloadButton = styled.button`
  align-items: center;
  background-clip: padding-box;
  background-color: #fa6400;
  border: 1px solid transparent;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  font-weight: 600;
  justify-content: center;
  line-height: 0.5;
  margin: 0;
  min-height: 2.2rem;
  padding: calc(.5rem - 1px) calc(1rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
  margin-left: 5px;

  &:hover,
  &:focus {
    background-color: #fb8332;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: #c85000;
    box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    margin-bottom:10px;
  }
`;