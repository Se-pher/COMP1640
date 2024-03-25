import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as s from '../Style/ArticleDetail';
import { useParams } from 'react-router-dom';

const ArticleDetailPage = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <s.Container>
      <s.ArticleImage src={article.avatarURL} alt={article.title} />
      <s.ArticleDetails>
        <s.ArticleTitle>{article.title}</s.ArticleTitle>
        <s.ArticleDate>{new Date(article.createdAt).toLocaleDateString()}</s.ArticleDate>
        <s.ArticleAuthor>
          <s.AuthorAvatar src={article.avatarURL} alt={article.author} />
          <span>{article.author}</span>
        </s.ArticleAuthor>
        <s.ArticleDescription>{article.description}</s.ArticleDescription>
      </s.ArticleDetails>
    </s.Container>
  );
};

export default ArticleDetailPage;
