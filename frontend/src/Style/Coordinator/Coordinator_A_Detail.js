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
    overflow: auto;
    height: 630px;
    max-height: -webkit-fill-available;
  @media (max-width: 768px) {
    width: 80%;
    position: absolute;
    height:auto;
  }
`;

export const FeedbackContainer = styled.div`
  margin-top: 20px;

  h2 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
  }
`;

export const FeedbackForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  textarea {
    resize: vertical;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    margin-bottom: 10px;
  }

  button {
    padding: 8px 16px;
    background-color: #F06A11;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #FA6400;
    }
  }
`;