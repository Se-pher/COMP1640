import React, { useState, useEffect } from "react";
import axios from "axios";
import * as s from "../../../Style/Student/Students";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const EditArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [wordFile, setWordFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [oldImageURL, setOldImageURL] = useState("");
  const [oldWordFileURL, setOldWordFileURL] = useState("");

  useEffect(() => {
    console.log(id);
    fetchArticle(id);
    fetchFaculties();
  }, [id]);

  const fetchArticle = async (articleId) => {
    try {
      const response = await axios.get(`/api/articles/${articleId}`);
      const articleData = response?.data?.article;
      setArticle(articleData);
      setTitle(articleData.title);
      setDescription(articleData.description);
      setFacultyName(articleData.facultyName);
      setOldImageURL(articleData.imageURL);
      setOldWordFileURL(articleData.wordFileURL);
      console.log(article);
      console.log(title)
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

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


  const handleEditSubmission = async (e) => {
    e.preventDefault();
    try {
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
      if (imageFile) {
        imageFormData.append("image", imageFile);
      }

      const wordFileFormData = new FormData();
      if (wordFile) {
        wordFileFormData.append("wordFile", wordFile);
      }

      let imageURL = oldImageURL;
      let fileURL = oldWordFileURL;

      if (imageFile) {
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

        imageURL = imageResponse.data.secure_url;
      }

      if (wordFile) {
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

        fileURL = wordFileResponse.data.fileURL;
      }

      const token = localStorage.getItem("jwtToken");
      if (token) {
        const userId = localStorage.getItem("userId");
        const articleData = {
          title,
          description,
          imageURL: imageURL,
          wordFileURL: fileURL,
          facultyName,
          userId,
        };

        console.log("Article: ", articleData);

        const response = await axios.put(`/api/articles/${id}`, articleData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Article edited successfully:", response.data);

        toast.success("Article edited successfully!", {
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
      console.error("Error editing article:", error);

      toast.error("Error editing article", {
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
        <Sidebar />
        <s.Main>
          <s.UploadContainer>
            <s.SquareContainer>
              <s.TitleHeader>Edit Article</s.TitleHeader>
              <s.InputWrapper>
                <s.Label>Select Faculty:</s.Label>
                <s.SelectFaculty
                  value={facultyName}
                  onChange={handleFacultyChange}
                >
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
                </s.SelectFaculty>
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
                <s.EditArticleButton onClick={handleEditSubmission}>
                  Edit Article
                </s.EditArticleButton>
              </s.ButtonContainer>
            </s.SquareContainer>
          </s.UploadContainer>
        </s.Main>
      </s.MainContent>
      <ToastContainer />
    </s.Container>
  );
};

export default EditArticle;