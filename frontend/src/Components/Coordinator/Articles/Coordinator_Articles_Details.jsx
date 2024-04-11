// frontend
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../../Navbar";
import * as s from "../../../Style/Student/Student_Details";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useParams } from "react-router-dom";

const Coordinator_Articles_Details = () => {
  const { id } = useParams();
  const [selectedItem, setSelectedItem] = useState("Articles");
  const [article, setArticle] = useState(null);
  const [userName, setUserName] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(`/api/articles/${id}`);
        console.log("Fetched article data:", data);

        setArticle(data.article);
        setUserName(data.username);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };
    fetchArticle();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`/api/feedbacks/${id}`);
        setFeedbacks(response.data.feedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [id]);

  const handleNewFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/feedbacks', {
        comment: newFeedback,
        articleId: id,
      });
      // Sau khi gửi phản hồi mới thành công, cần cập nhật lại danh sách phản hồi
      const response = await axios.get(`/api/feedbacks/${id}`);
      setFeedbacks(response.data.feedbacks);
      setNewFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
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
              {article.wordFileURL ? (
                <DocViewer
                  pluginRenderers={DocViewerRenderers}
                  documents={[{ uri: article.wordFileURL, fileType: "docx" }]}
                  style={{ height: "600px" }}
                />
              ) : (
                <p>Không tìm thấy tệp word.</p>
              )}

              {/* Form nhập phản hồi mới */}
              <form onSubmit={handleNewFeedbackSubmit}>
                <textarea
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  placeholder="Nhập phản hồi của bạn..."
                />
                <button type="submit">Gửi phản hồi</button>
              </form>

              {/* Hiển thị danh sách phản hồi */}
              <div>
                <h2>Phản hồi</h2>
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

export default Coordinator_Articles_Details;
