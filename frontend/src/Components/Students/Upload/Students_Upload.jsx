import React, { useState, useEffect } from "react";
import * as s from "../../../Style/Student/Students";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import axios from "axios";
// import Term from './Term';

const Student_Upload = () => {
  const [selectedItem, setSelectedItem] = useState("Upload Articles");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [userName, setUserName] = useState("");

  // const [imageFile, setImageFile] = useState(null);

  // const handleImageUpload = (e) => {
  //     setImageFile(e.target.files[0]);
  // };
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
      // const imageFormData = new FormData();
      // imageFormData.append('image', imageFile);

      // const imageResponse = await axios.post('/api/images', imageFormData, {
      //     headers: {
      //         'Content-Type': 'multipart/form-data'
      //     }
      // });
      // const contributionId = imageResponse.data._id;
      const wordCount = content.trim().split(/\s+/).length;

      const articleData = {
        title,
        description,
        content,
        createdAt: new Date(),
        facultyName: "Your Faculty Name",
        author: "Your Name",
        avatarURL: "Your Avatar URL",
        // contributionId
      };

      const articleResponse = await axios.post("/api/articles", articleData);

      console.log("Article uploaded successfully:", articleResponse.data);
      setTitle("");
      setDescription("");
      setContent("");
      // setImageFile(null);
    } catch (error) {
      console.error("Error uploading article:", error);
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
                <s.Label>Content:</s.Label>
                <s.TextArea
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter Content"
                />
              </s.InputWrapper>
              {/* <s.InputWrapper>
                                <s.Label>Upload Image:</s.Label>
                                <input type="file" onChange={handleImageUpload} />
                            </s.InputWrapper> */}
              <s.ButtonContainer>
                <s.UploadArticlesButton onClick={handleUpload}>
                  Upload Articles
                </s.UploadArticlesButton>
              </s.ButtonContainer>
            </s.SquareContainer>
          </s.UploadContainer>
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Student_Upload;
