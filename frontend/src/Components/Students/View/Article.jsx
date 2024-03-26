import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const ArticleContainer = styled.div`
  margin-top: 20px;
`;

const ArticleCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const ArticleTitle = styled.h3`
  margin-bottom: 5px;
`;

const ArticleDescription = styled.p`
  margin-bottom: 5px;
`;

const ArticleContent = styled.p`
  margin-bottom: 5px;
`;

const ArticleAuthor = styled.p`
  font-style: italic;
  margin-bottom: 5px;
`;

const ArticleDate = styled.p`
  color: #666;
  margin-bottom: 5px;
`;


const Article = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <ArticleContainer>
      <h2>All Articles</h2>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div>
          {articles.map((article, index) => (
            <ArticleCard key={index}>
              <ArticleTitle>
                <Link to={`/edit-article/${article._id}`}>{article.title}</Link>
              </ArticleTitle>
              <ArticleDescription>Description: {article.description}</ArticleDescription>
              <ArticleContent>Content: {article.content}</ArticleContent>
              <ArticleAuthor>Author: {article.author}</ArticleAuthor>
              <ArticleDate>Published Date: {new Date(article.createdAt).toLocaleDateString()}</ArticleDate>
            </ArticleCard>
          ))}
        </div>
      )}
    </ArticleContainer>
  );
};

export default Article;
