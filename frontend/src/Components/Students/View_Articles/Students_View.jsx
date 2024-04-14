import React, { useState, useEffect } from "react";
import * as s from "../../../Style/Student/Students_view";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import StudentsCard from "./Students_Card";
import axios from "axios";

const Students_View = () => {
  const [selectedItem, setSelectedItem] = useState("View Articles");
  const [userName, setUserName] = useState("");
  const [articles, setArticles] = useState([]);
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

  useEffect(() => {
    const fetchUserArticles = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) return;
        const response = await axios.get("/api/user/articles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            sort: "createdAt",
          },
        });
        setArticles(response.data.reverse());
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchUserArticles();
  }, []);

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

  const handleItemClick = (item) => {
    setSelectedItem(item);
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
              {currentArticles.map((articles) => (
                <StudentsCard key={articles._id} article={articles} />
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

export default Students_View;