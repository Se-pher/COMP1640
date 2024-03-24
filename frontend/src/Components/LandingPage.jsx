import React, { useState } from "react";
import Mountain from "../Image/Mountains.jpg";
import * as s from "../Style/Landing";
import ArticleCard from "./ArticleCard";
import { articles } from "./data";

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <s.Container>
      <s.Header>
        <s.Image src={Mountain} alt="" />
        <s.TextContainer>
          <h1>Welcome to My Blog</h1>
          <p>Explore the Latest Articles</p>
          <button>Explore</button>
        </s.TextContainer>
      </s.Header>
      <s.Section>
        <s.Title>Articles</s.Title>
        <s.ArticleGrid>
          {currentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </s.ArticleGrid>
        <s.Pagination>
          {Array.from({ length: Math.ceil(articles.length / articlesPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </button>
          ))}
        </s.Pagination>
      </s.Section>
    </s.Container>
  );
};

export default LandingPage;