import React from 'react';
import * as s from '../../../Style/Coordinator/CoordinatorArticles';
import { Link } from 'react-router-dom';

const CoordinatorArticleCard = ({ article }) => {
  return (
    <s.CoordinatorArticleCard>
      <Link to={`/Coordinator/article/${article._id}`}>
        <s.ArticleImage src={article.imageURL} alt={article.title} />
      </Link>
      <s.ArticleInfo>
        <s.ArticleDate>
        {new Date(article.createdAt).toLocaleDateString()} | {article.facultyName} 
        </s.ArticleDate>
        <s.ArticleTitle>{article.title}</s.ArticleTitle>
        <s.ArticleDescription>{article.description}</s.ArticleDescription>
      </s.ArticleInfo>
    </s.CoordinatorArticleCard>
  );
};

export default CoordinatorArticleCard;