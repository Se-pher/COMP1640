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
  const [facultyDeadline, setFacultyDeadline] = useState(null);
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
        setFacultyDeadline(response.data.facultyDeadline);
        setStatus(response.data.status);
        console.log(response);
        console.log("Faculty: ", setFacultyDeadline);

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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.delete(`/api/articles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Article deleted successfully");
        window.location.href = "/student/View";
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };


  const isDeadlinePassed = () => {
    const currentDate = new Date();
    const deadline = new Date(facultyDeadline);
    console.log(deadline);
    console.log("Deadline: ", deadline < currentDate);
    return deadline < currentDate;
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
              {isDeadlinePassed() ? (
                <s.EditButton>Deadline Passed</s.EditButton>
              ) : (
                <s.EditButton>
                <Link to={`/student/edit/article/${id}`} className="edit-button">
                  Edit
                </Link>
                </s.EditButton>
              )}
              <s.DeleteButton onClick={handleDelete}>Delete</s.DeleteButton>
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
