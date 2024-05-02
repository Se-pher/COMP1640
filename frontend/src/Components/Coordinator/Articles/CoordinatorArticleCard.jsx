import React from 'react';
import * as s from '../../../Style/Coordinator/CoordinatorArticles';
import { Link } from 'react-router-dom';

const CoordinatorArticleCard = ({ article }) => {
  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  const titles = truncateDescription(article.title, 26);
  const shortDescription = truncateDescription(article.description, 93);

  return (
    <s.CoordinatorArticleCard>
      <Link to={`/Coordinator/article/${article._id}`}>
        <s.ArticleImage src={article.imageURL} alt={article.title} />
      </Link>
      <s.ArticleInfo>
        <s.ArticleDate>
        {new Date(article.createdAt).toLocaleDateString()} | {article.facultyName} 
        </s.ArticleDate>
        <s.ArticleTitle>{titles}</s.ArticleTitle>
          <s.ArticleDescription>{shortDescription}</s.ArticleDescription>
      </s.ArticleInfo>
    </s.CoordinatorArticleCard>
  );
};

export default CoordinatorArticleCard;