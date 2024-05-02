import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #eaebef;

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
    margin-top: 0;
  }
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const ChartContainerWrapper = styled.div`
  width: 100%;
  max-width: -webkit-fill-available;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    margin-top: 80px;
  }
`;

export const ChartContainer = styled.div`
  width: 70%;
  height: 300px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`;

export const ViewModeButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  height: 30px;

  button {
    background-color: #f0f0f0;
    border: none;
    padding: 6px 12px;
    margin-left: 8px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &.active {
      background-color: #29325b;
      color: white;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
`;

export const LowerContainersWrapper = styled.div`
  width: 100%;
`;

export const DataContainerWrapper = styled.div`
  width: 100%;
  height: 280px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  max-width: -webkit-fill-available;
  overflow: auto;

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const DataContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const NewPostsContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const SectionTitle = styled.h3`
  color: #29325b;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PostItem = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
`;

export const PostTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  color: #29325b;
`;

export const PostAuthor = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

export const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;