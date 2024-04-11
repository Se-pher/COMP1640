import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import * as s from "../../../Style/Student/Student_Details";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useParams } from "react-router-dom";

const Student_Article_Details = () => {
  const { id } = useParams();
  const [selectedItem, setSelectedItem] = useState("View Articles");
  const [article, setArticle] = useState(null);
  const [userName, setUserName] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`/api/articles/${id}`);
      setArticle(response.data.article);
      setUserName(response.data.username);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`/api/feedbacks/${id}`);
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchArticle();
    fetchFeedbacks();
  }, [id]);

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
          {article && (
            <s.ArticleContainer>
              <s.EditButton>Edit</s.EditButton>
              {article.wordFileURL ? (
                <DocViewer
                  pluginRenderers={DocViewerRenderers}
                  documents={[{ uri: article.wordFileURL, fileType: "docx" }]}
                  style={{ height: "600px" }}
                />
              ) : (
                <p>Không tìm thấy tệp word.</p>
              )}
              <div>
                <h2>Feedbacks</h2>
                <ul>
                  {feedbacks.map((feedback, index) => (
                    <li key={index}>{feedback.comment}</li>
                  ))}
                </ul>
              </div>
            </s.ArticleContainer>
          )}
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Student_Article_Details;