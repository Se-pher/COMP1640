import React from 'react';
import * as s from '../../../Style/Manager/Manager_Articles_View';
import { Link } from 'react-router-dom';

const ManagerCard = ({ article, onSelect, isSelected }) => {
  const handleSelect = () => {
    onSelect(article, !isSelected);
  };

  const truncateDescription = (description, limit) => {
    const words = description.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return description;
  };

  return (
    <s.ManagerCard>
      <Link to={`/Manager/article/${article._id}`}>
        <s.ArticleImage src={article.imageURL} alt={article.title} />
      </Link>
      <s.ArticleInfo>
        <s.ArticleDate>
          {new Date(article.createdAt).toLocaleDateString()} | {article.facultyName}
        </s.ArticleDate>
        <s.ArticleTitle>{truncateDescription(article.title, 6)}</s.ArticleTitle>
        <s.ArticleDescription>{truncateDescription(article.description, 14)}</s.ArticleDescription>
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