import React from 'react';
import * as s from '../../../Style/Student/Students_view';
import { Link } from 'react-router-dom';

const StudentsCard = ({ article }) => {
    return (
      <s.StudentsCard>
        <Link to={`/Student/View/article/${article._id}`}>
        <s.ArticleImage src={article.imageURL} alt={article.title} />
        </Link>
        <s.ArticleInfo>
        <s.ArticleDate>
          {new Date(article.createdAt).toLocaleDateString()} | {article.facultyName} 
        </s.ArticleDate>
        <s.ArticleTitle>{article.title}</s.ArticleTitle>
        <s.ArticleDescription>{article.description}</s.ArticleDescription>
        </s.ArticleInfo>
      </s.StudentsCard>
    );
  };

export default StudentsCard;