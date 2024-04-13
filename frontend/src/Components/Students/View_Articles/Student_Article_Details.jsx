import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import * as s from "../../../Style/Student/Student_Details";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Student_Article_Details = () => {
  const { id } = useParams();
  const [selectedItem, setSelectedItem] = useState("View Articles");
  const [article, setArticle] = useState(null);
  const [userName, setUserName] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [status, setStatus] = useState("");
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setArticle(response.data.article);
        setUserName(response.data.username);
        setStatus(response.data.status);
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
              <s.EditButton>
                <Link to={`/Student/Edit/${id}`} className="edit-button">
                  Edit
                </Link>
              </s.EditButton>
              <p>Status: {status}</p>
              {article.wordFileURL ? (
                <DocViewer
                  pluginRenderers={DocViewerRenderers}
                  documents={[{ uri: article.wordFileURL, fileType: "docx" }]}
                  style={{ height: "600px" }}
                />
              ) : (
                <p>Word file not found.</p>
              )}
              <s.FeedbackContainer>
                <h2>Feedback</h2>
                <ul>
                  {feedbacks.map((feedback, index) => (
                    <li key={index}>
                      <div>
                        <span>
                          {new Date(feedback.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p>{feedback.comment}</p>
                    </li>
                  ))}
                </ul>
              </s.FeedbackContainer>
            </s.ArticleContainer>
          )}
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Student_Article_Details;
