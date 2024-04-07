import React from 'react';
import * as s from '../Style/Landing';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const truncateDescription = (description, limit) => {
    const words = description.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return description;
  };

  return (
    <s.ArticleCard>
      <Link to={`/articles/${article._id}`}> 
        <s.ArticleImage src={article.imageURL} alt={article.title} />
      </Link>
      <s.ArticleInfo>
        <s.ArticleDate>
          {new Date(article.createdAt).toLocaleDateString()} | {article.facultyName} 
        </s.ArticleDate>
        <s.ArticleTitle>{article.title}</s.ArticleTitle>
        <s.ArticleDescription>
          {truncateDescription(article.description, 19)}
        </s.ArticleDescription>
        <s.ArticleAuthor>
          <s.AuthorAvatar src={article.avatarURL} alt={article.author} /> 
          <span>{article.author}</span>
        </s.ArticleAuthor>
      </s.ArticleInfo>
    </s.ArticleCard>
  );
};

export default ArticleCard;
