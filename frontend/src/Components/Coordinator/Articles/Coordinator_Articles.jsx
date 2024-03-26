import React, { useState } from "react";
import * as s from "../../../Style/Coordinator/CoordinatorArticles";
import Sidebar from "../Sidebar";
import Navbar from "../../Navbar";
import CoordinatorArticleCard from './CoordinatorArticleCard';
import { articles } from "../../data";

const Coordinator_Articles = () => {
  const [selectedItem, setSelectedItem] = useState("Articles");
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <s.Container>
      <Navbar />
      <s.MainContent>
      <Sidebar selectedItem={selectedItem} handleItemClick={handleItemClick} />
        <s.Main>
          <s.ArticlesContainer>
            <s.ArticleGrid>
              {currentArticles.map((article) => (
                <CoordinatorArticleCard key={article.id} article={article} />
              ))}
            </s.ArticleGrid>
            <s.Pagination>
              {Array.from(
                { length: Math.ceil(articles.length / articlesPerPage) },
                (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    disabled={currentPage === i + 1}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </s.Pagination>
          </s.ArticlesContainer>
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Coordinator_Articles;
