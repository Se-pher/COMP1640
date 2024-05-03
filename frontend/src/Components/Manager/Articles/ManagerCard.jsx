  import React from 'react';
  import * as s from '../../../Style/Manager/Manager_Articles_View';
  import { Link } from 'react-router-dom';

  const ManagerCard = ({ article, onSelect, isSelected }) => {
    const handleSelect = () => {
      onSelect(article, !isSelected);
    };

    const truncateDescription = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      return `${text.slice(0, maxLength)}...`;
    };
    
    const titles = truncateDescription(article.title, 26);
    const shortDescription = truncateDescription(article.description, 93);

    const formatDeadlineMessage = () => {
      return "Cannot select article: Deadline has not passed.";
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
          <s.ArticleTitle>{titles}</s.ArticleTitle>
          <s.ArticleDescription>{shortDescription}</s.ArticleDescription>
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