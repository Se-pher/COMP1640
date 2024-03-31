import React, { useState, useEffect } from "react";
import * as s from "../../../Style/Student/Students";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import axios from "axios";
// import Term from './Term';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Student_Upload = () => {
  const [selectedItem, setSelectedItem] = useState("Upload Articles");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userName] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [wordFile, setWordFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const UploadDropzone = ({ onFileUpload, accept }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          onFileUpload(acceptedFiles[0]);
        }
      },
      accept,
    });

    return (
      <s.DropzoneContainer {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag &amp; drop file here, or click to select file</p>
        )}
      </s.DropzoneContainer>
    );
  };

  const UploadedFile = ({ file, onDelete }) => {
    return (
      <s.UploadedFileContainer>
        <s.FileName>{file.file.name}</s.FileName>
        {file.progress > 0 && file.progress < 100 && (
          <s.ProgressBar>
            <s.ProgressValue style={{ width: `${file.progress}%` }} />
          </s.ProgressBar>
        )}
        {file.progress === 100 && <s.UploadedIcon>&#10003;</s.UploadedIcon>}
        <s.DeleteButton onClick={() => onDelete(file)}>
          <FontAwesomeIcon icon={faTrash} />
        </s.DeleteButton>
      </s.UploadedFileContainer>
    );
  };

  const handleDeleteFile = (file) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const handleImageUpload = (acceptedFile) => {
    if (acceptedFile) {
      setImageFile(acceptedFile);
      setUploadedFiles((prevFiles) => [
        ...prevFiles,
        { file: acceptedFile, type: "image", progress: 0 },
      ]);
    }
  };

  const handleWordUpload = (acceptedFile) => {
    if (acceptedFile) {
      setWordFile(acceptedFile);
      setUploadedFiles((prevFiles) => [
        ...prevFiles,
        { file: acceptedFile, type: "word", progress: 0 },
      ]);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      fetchUsername(token);
      fetchUserData(token);
    }
  }, []);

  const fetchUsername = async (token) => {
    try {
      const response = await axios.get("/api/decode-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching username:", error.response.data.message);
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("/api/decode-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setFacultyName(response.data.facultyName);
      } else {
        console.error("Error: User data is null");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.response.data.message);
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
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadedFiles((prevFiles) =>
            prevFiles.map((file) =>
              file.type === "image" ? { ...file, progress } : file
            )
          );
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
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadedFiles((prevFiles) =>
              prevFiles.map((file) =>
                file.type === "word" ? { ...file, progress } : file
              )
            );
          },
        }
      );
      const fileURL = wordFileResponse.data.fileURL;

      const token = localStorage.getItem("jwtToken");
      if (token) {
        const articleData = {
          title,
          description,
          imageURL,
          wordFileURL: fileURL,
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
      }
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
                <UploadDropzone
                  onFileUpload={handleImageUpload}
                  accept={{ "image/*": [] }}
                />
              </s.InputWrapper>
              <s.InputWrapper>
                <s.Label>Upload Word File:</s.Label>
                <UploadDropzone
                  onFileUpload={handleWordUpload}
                  accept={{
                    "application/msword": [".doc"],
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                      [".docx"],
                  }}
                />
              </s.InputWrapper>
              <s.UploadedFilesContainer>
                {uploadedFiles.map((file, index) => (
                  <UploadedFile
                    key={index}
                    file={file}
                    onDelete={handleDeleteFile}
                  />
                ))}
              </s.UploadedFilesContainer>
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
