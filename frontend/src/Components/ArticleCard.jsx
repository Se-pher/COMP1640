import React from 'react';
import * as s from '../Style/Landing';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <s.ArticleCard>
      <Link to={`/articles/${article.id}`}>
        <s.ArticleImage src={article.imageUrl} alt={article.title} />
      </Link>
      <s.ArticleInfo>
        <s.ArticleDate>
          {article.date} | {article.faculty}
        </s.ArticleDate>
        <s.ArticleTitle>{article.title}</s.ArticleTitle>
        <s.ArticleDescription>{article.description}</s.ArticleDescription>
        <s.ArticleAuthor>
          <s.AuthorAvatar src={article.authorAvatar} alt={article.author} />
          <span>{article.author}</span>
        </s.ArticleAuthor>
      </s.ArticleInfo>
    </s.ArticleCard>
  );
};

export default ArticleCard;