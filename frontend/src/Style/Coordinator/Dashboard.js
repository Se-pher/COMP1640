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
`;

export const ChartContainer = styled.div`
  width: 70%;
  height: 320px;
  display: flex;
  justify-content: center;
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
`;

export const LowerContainersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
`;

export const DataContainerWrapper = styled.div`
  width: 47%;
  height: 280px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

export const FacultyCountsContainerWrapper = styled.div`
  width: 48%;
  height: 280px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

export const DataContainer = styled.div`
  display: flex;
`;

export const NewPostsContainer = styled.div`
  width: 45%;
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

export const FacultyCountsContainer = styled.div`
  width: 45%;
`;

export const FacultyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FacultyItem = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FacultyName = styled.span`
  font-weight: bold;
  color: #29325b;
`;

export const FacultyCount = styled.span`
  color: #666;
`;