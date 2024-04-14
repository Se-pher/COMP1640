import React, { useState, useEffect } from "react";
import * as s from "../../../Style/Student/Students";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import axios from "axios";
import Term from './Term';
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
  const [facultyList, setFacultyList] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [openTermPopup, setOpenTermPopUp] = useState(false)

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get("/api/faculties");
      setFacultyList(response.data);
    } catch (error) {
      console.error("Error fetching faculties:", error.response.data.message);
    }
  };

  const isDeadlinePassed = (deadline) => {
    const currentDate = new Date();
    return new Date(deadline) < currentDate;
  };

  const handleFacultyChange = (event) => {
    setFacultyName(event.target.value);
  };

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

  const handleAcceptTerm = () => {
    setTermsAccepted(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  };

  const openTermPopups = () => {
    setOpenTermPopUp(true)
  }
  
  const handleRejectTerm = () => {
    setOpenTermPopUp(false);
  }

  const handleUpload = async (accept) => {
    if (accept) {
      console.log(accept)
      try {
        toast.warning("Article is uploading!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (!title || !description || !facultyName) {
          toast.error("Please enter title, description, and select faculty", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }

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

        if (!title || !description) {
          toast.error("Please enter title and description", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }

        const token = localStorage.getItem("jwtToken");
        if (token) {
          // Lấy userId từ localStorage
          const userId = localStorage.getItem("userId");

          const articleData = {
            title,
            description,
            imageURL,
            wordFileURL: fileURL,
            facultyName,
            userId, // Thêm userId vào dữ liệu bài viết
          };

          const articleResponse = await axios.post("/api/articles", articleData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

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
      } finally {
        setOpenTermPopUp(false)
      }
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
          <Term openPopup={openTermPopup} onConfirm={handleUpload} onReject={handleRejectTerm}></Term>
          <s.UploadContainer>
            <s.SquareContainer>
              <s.TitleHeader>Upload Articles</s.TitleHeader>
              <s.InputWrapper>
                <s.Label>Select Faculty:</s.Label>
                <s.setFaculty value={facultyName} onChange={handleFacultyChange}>
                  <option value="">Select Faculty</option>
                  {facultyList.map((faculty) => (
                    <option
                      key={faculty._id}
                      value={faculty.facultyName}
                      disabled={isDeadlinePassed(faculty.facultyDeadline)}
                    >
                      {faculty.facultyName}{" "}
                      {isDeadlinePassed(faculty.facultyDeadline) ? (
                        <span style={{ color: "red" }}>Ended</span>
                      ) : (
                        <span style={{ color: "green" }}>Ongoing</span>
                      )}
                    </option>
                  ))}
                </s.setFaculty>
              </s.InputWrapper>
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
                <s.UploadArticlesButton onClick={openTermPopups}>
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
