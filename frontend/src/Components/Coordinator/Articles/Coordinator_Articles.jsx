import React, { useState, useEffect } from "react";
import * as s from "../../../Style/Coordinator/CoordinatorArticles";
import Sidebar from "../Sidebar";
import Navbar from "../../Navbar";
import CoordinatorArticleCard from './CoordinatorArticleCard';
import axios from "axios";

const Coordinator_Articles = () => {
  const [selectedItem, setSelectedItem] = useState("Articles");
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const [facultyName, setFacultyName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setFacultyName(response.data.facultyName); 
        fetchArticles(response.data.facultyName); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, );

  const fetchArticles = async () => {
    try {
      const response = await axios.get("/api/articles", {
        params: { facultyName }, 
      });
      const filteredArticles = response.data.filter(article => article.facultyName === facultyName);
      setArticles(filteredArticles);
    } catch (error) {
      console.error("Error fetching articles:", error.response.data.message);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  
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
