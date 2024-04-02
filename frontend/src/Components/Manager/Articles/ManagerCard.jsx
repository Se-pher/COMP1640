import React, { useState } from 'react';
import * as s from '../../../Style/Manager/Manager_Articles_View';
import { Link } from 'react-router-dom';

const ManagerCard = ({ article, onSelect }) => {
    const [isSelected, setIsSelected] = useState(false);
  
    const handleSelect = () => {
      setIsSelected(!isSelected);
      onSelect(article, !isSelected);
    };

  return (
    <s.ManagerCard>
      <Link to={`/Manager/Article/${article._id}`}>
        <s.ArticleImage src={article.imageURL} alt={article.title} />
      </Link>
      <s.ArticleInfo>
        <s.ArticleDate>
          {new Date(article.createdAt).toLocaleDateString()} | {article.facultyName}
        </s.ArticleDate>
        <s.ArticleTitle>{article.title}</s.ArticleTitle>
        <s.ArticleDescription>{article.description}</s.ArticleDescription>
        <s.SelectionCheckbox>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelect}
        />
      </s.SelectionCheckbox>
      </s.ArticleInfo>
    </s.ManagerCard>
  );
};

export default ManagerCard;