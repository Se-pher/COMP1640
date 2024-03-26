import React from 'react';
import * as s from '../../../Style/Coordinator/CoordinatorArticles';
import { Link } from 'react-router-dom';

const CoordinatorArticleCard = ({ article }) => {
  return (
    <s.CoordinatorArticleCard>
      <Link to={`/Coordinator/Articles/${article.id}`}>
        <s.ArticleImage src={article.imageUrl} alt={article.title} />
      </Link>
      <s.ArticleInfo>
        <s.ArticleDate>
          {article.date} | {article.faculty}
        </s.ArticleDate>
        <s.ArticleTitle>{article.title}</s.ArticleTitle>
        <s.ArticleDescription>{article.description}</s.ArticleDescription>
      </s.ArticleInfo>
    </s.CoordinatorArticleCard>
  );
};

export default CoordinatorArticleCard;