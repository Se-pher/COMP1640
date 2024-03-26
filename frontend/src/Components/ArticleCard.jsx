// ArticleCard Component
import React from 'react';
import * as s from '../Style/Landing';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <s.ArticleCard>
      <Link to={`/articles/${article._id}`}> 
        <s.ArticleImage src={article.avatarURL} alt={article.title} />
      </Link>
      <s.ArticleInfo>
        <s.ArticleDate>
          {new Date(article.createdAt).toLocaleDateString()} | {article.facultyName} 
        </s.ArticleDate>
        <s.ArticleTitle>{article.title}</s.ArticleTitle>
        <s.ArticleDescription>{article.description}</s.ArticleDescription>
        <s.ArticleAuthor>
          <s.AuthorAvatar src={article.avatarURL} alt={article.author} /> 
          <span>{article.author}</span>
        </s.ArticleAuthor>
      </s.ArticleInfo>
    </s.ArticleCard>
  );
};

export default ArticleCard;
