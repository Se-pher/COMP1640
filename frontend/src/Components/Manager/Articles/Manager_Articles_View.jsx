import React, { useState, useEffect } from "react";
import * as s from "../../../Style/Manager/Manager_Articles_View";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import ManagerCard from "./ManagerCard";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const Manager_Articles_View = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticles, setSelectedArticles] = useState([]);
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

  const handleArticleSelect = (article, isSelected) => {
    if (isSelected) {
      setSelectedArticles([...selectedArticles, article]);
    } else {
      setSelectedArticles(
        selectedArticles.filter((a) => a._id !== article._id)
      );
    }

    console.log("Selected articles:", selectedArticles);
  };

  const handleDownloadSelectedArticles = async () => {
    const zip = new JSZip();
    const requests = [];

    for (const article of selectedArticles) {
      const wordFilePromise = axios.get(article.wordFileURL, {
        responseType: "blob",
      });
      const imagePromise = axios.get(article.imageURL, {
        responseType: "blob",
      });

      requests.push(wordFilePromise, imagePromise);
    }

    try {
      const responses = await Promise.all(requests);

      responses.forEach((response, index) => {
        const article = selectedArticles[Math.floor(index / 2)];
        const fileName =
          index % 2 === 0 ? `${article.title}.docx` : `${article.title}.jpg`;
        zip.file(fileName, response.data);
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "downloaded_articles.zip");
    } catch (error) {
      console.error("Error downloading articles:", error);
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api/articles");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleLogout = () => {
    console.log("Logging out..."); // Thêm dòng này để ghi thông điệp vào console
    localStorage.removeItem('jwtToken'); 
    window.location.href = "/";
  };
  return (
    <s.Container>
      <Navbar />
      <s.MainContent>
        <Sidebar 
        selectedItem="View Articles"
        handleLogout={handleLogout}/>
        <s.Main>
          <s.ArticlesContainer>
            <s.ArticleGrid>
              {currentArticles.map((article) => (
                <ManagerCard
                  key={article._id}
                  article={article}
                  onSelect={handleArticleSelect}
                  isSelected={selectedArticles.some(
                    (selected) => selected._id === article._id
                  )}
                />
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
          <s.DownloadButton onClick={handleDownloadSelectedArticles}>
            Download Selected Articles
          </s.DownloadButton>
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Manager_Articles_View;
