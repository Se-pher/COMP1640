import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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

export const ArticleImage = styled.img`
    width: 100%;
    max-height: 600px;
    object-fit: cover;
`;

export const ArticleDetails = styled.div`
  padding: 1rem;
`;

export const ArticleTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

export const ArticleDate = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

export const ArticleAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const AuthorAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

export const ArticleDescription = styled.p`
  font-size: 0.9rem;
  color: #333;
`;