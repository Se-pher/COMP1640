import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

export const Main = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const ArticleContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 5rem;
  @media (max-width: 768px) {
    width: 80%;
    position: absolute;
    height:auto;
  }
`;

export const EditButton = styled.button`

`;