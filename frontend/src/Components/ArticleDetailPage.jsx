import React from 'react';
import * as s from '../Style/ArticleDetail';
import { articles } from './data';
import { useParams } from 'react-router-dom';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const article = articles.find((article) => article.id === parseInt(id));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <s.Container>
      <s.ArticleImage src={article.imageUrl} alt={article.title} />
      <s.ArticleDetails>
        <s.ArticleTitle>{article.title}</s.ArticleTitle>
        <s.ArticleDate>{article.date}</s.ArticleDate>
        <s.ArticleAuthor>
          <s.AuthorAvatar src={article.authorAvatar} alt={article.author} />
          <span>{article.author}</span>
        </s.ArticleAuthor>
        <s.ArticleDescription>{article.description}</s.ArticleDescription>
      </s.ArticleDetails>
    </s.Container>
  );
};

export default ArticleDetailPage;