import React, { useState, useEffect } from "react";
import * as s from "../../../Style/Student/Students";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import axios from "axios";
// import Term from './Term';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Student_Upload = () => {
  const [selectedItem, setSelectedItem] = useState("Upload Articles");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userName, setUserName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [wordFile, setWordFile] = useState(null);

  const handleImageUpload = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleWordUpload = (e) => {
    setWordFile(e.target.files[0]);
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

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };

  const handleUpload = async () => {
    try {
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      const wordFileFormData = new FormData();
      wordFileFormData.append("wordFile", wordFile);

      const imageResponse = await axios.post("/api/images", imageFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageURL = imageResponse.data.secure_url;

      const wordFileResponse = await axios.post(
        "/api/wordFiles",
        wordFileFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const wordFileURL = wordFileResponse.data.secure_url;

      const facultyName = "Your Faculty Name";

      const articleData = {
        title,
        description,
        imageURL,
        wordFileURL,
        facultyName,
      };

      const articleResponse = await axios.post("/api/articles", articleData);

      console.log("Article uploaded successfully:", articleResponse.data);
      setTitle("");
      setDescription("");
      setImageFile(null);
      setWordFile(null);

      toast.success("Article uploaded successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error uploading article:", error);

      toast.error("Error uploading article", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
          <s.UploadContainer>
            <s.SquareContainer>
              <s.TitleHeader>Upload Articles</s.TitleHeader>
              <s.InputWrapper>
                <s.Label>Title:</s.Label>
                <s.Input
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Title"
                />
              </s.InputWrapper>
              <s.InputWrapper>
                <s.Label>Description:</s.Label>
                <s.TextArea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Description"
                />
              </s.InputWrapper>
              <s.InputWrapper>
                <s.Label>Upload Image:</s.Label>
                <input type="file" onChange={handleImageUpload} />
              </s.InputWrapper>
              <s.InputWrapper>
                <s.Label>Upload Word File:</s.Label>
                <input type="file" onChange={handleWordUpload} />
              </s.InputWrapper>
              <s.ButtonContainer>
                <s.UploadArticlesButton onClick={handleUpload}>
                  Upload Articles
                </s.UploadArticlesButton>
              </s.ButtonContainer>
            </s.SquareContainer>
          </s.UploadContainer>
        </s.Main>
      </s.MainContent>
      <ToastContainer />
    </s.Container>
  );
};

export default Student_Upload;
