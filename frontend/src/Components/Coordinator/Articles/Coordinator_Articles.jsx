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
  const [userName, setUserName] = useState("");

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
        params: { facultyName, sort: "createdAt" },
      });
      const filteredArticles = response.data.filter(
        (article) => article.facultyName === facultyName
      );
      setArticles(filteredArticles.reverse());
    } catch (error) {
      console.error("Error fetching articles:", error.response.data.message);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      fetchUsername(token);
    }
  }, []);

  const fetchUsername = async (token) => {
    try {
      const response = await axios.get("/api/decode-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserName(response.data.username);
    } catch (error) {
      console.error("Error fetching username:", error.response.data.message);
    }
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

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  };
  return (
    <s.Container>
      <Navbar />
      <s.MainContent>
      <Sidebar
          selectedItem={selectedItem}
          handleItemClick={handleItemClick}
          userName={userName}
          handleLogout={handleLogout}
        />
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
