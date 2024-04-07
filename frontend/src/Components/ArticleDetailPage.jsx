import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as s from '../Style/ArticleDetail';
import { useParams } from 'react-router-dom';

const ArticleDetailPage = () => {
  const [article, setArticle] = useState(null);
  const [username, setUsername] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setArticle(response.data.article);

        if (response.data.username) {
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article || !username) {
    return <div>Loading...</div>;
  }

  return (
    <s.Container>
      <s.ArticleImage src={article.imageURL} alt={article.title} />
      <s.ArticleDetails>
        <s.ArticleTitle>{article.title}</s.ArticleTitle>
        <s.ArticleDate>{new Date(article.createdAt).toLocaleDateString()}</s.ArticleDate>
        <s.ArticleAuthor>{username}</s.ArticleAuthor> {/* Sử dụng thông tin về người dùng để hiển thị tên người dùng */}
        <s.ArticleDescription>{article.description}</s.ArticleDescription>
      </s.ArticleDetails>
    </s.Container>
  );
};

export default ArticleDetailPage;
