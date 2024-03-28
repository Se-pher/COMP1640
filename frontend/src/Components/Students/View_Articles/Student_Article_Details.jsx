import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import * as s from "../../../Style/Student/Student_Details";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useParams } from "react-router-dom";

const Student_Article_Details = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(`/api/articles/${id}`);
        console.log("Fetched article data:", data);
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };
    fetchArticle();
  }, [id]);

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
              {article && article.wordFileURL ? (
                <DocViewer
                  pluginRenderers={DocViewerRenderers}
                  documents={[
                    {
                      uri: article.wordFileURL,
                      fileType: "docx",
                    },
                  ]}
                  style={{ height: "600px" }}
                />
              ) : (
                <p>Không tìm thấy tệp word.</p>
              )}
            </s.ArticleContainer>
          )}
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Student_Article_Details;
