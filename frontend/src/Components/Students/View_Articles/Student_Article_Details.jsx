import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import * as s from "../../../Style/Student/Student_Details";

const Student_Article_Details = ({ match }) => {
  const [article, setArticle] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(`/api/articles/${match.params.id}`);
        console.log("Fetched article data:", data); // Thêm dòng này
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [match.params.id]);

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

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };

  return (
    <s.Container>
      <Navbar />
      <s.MainContent>
        <Sidebar
          selectedItem="View Article Details"
          userName={userName}
          handleLogout={handleLogout}
        />
        <s.Main>
          {article && (
            <s.ArticleContainer>
              <iframe
                src={`https://docs.google.com/viewer?url=${article.wordFileUrl}&embedded=true`}
                frameBorder="0"
                width="100%"
                height="600px"
                title="Article Preview"
              ></iframe>
            </s.ArticleContainer>
          )}
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Student_Article_Details;
