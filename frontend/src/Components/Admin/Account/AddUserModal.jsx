import React, { useState, useEffect } from "react";
import * as s from "../../../Style/PopUp";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUserModal = ({ onClose, onAddUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [facultyList, setFacultyList] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");

  useEffect(() => {
    fetchFaculties();
    fetchUsers();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get("/api/faculties");
      setFacultyList(response.data);
    } catch (error) {
      console.error("Error fetching faculties:", error.response.data.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.response.data.message);
    }
  };

  const isExistingUser = () => {
    const existingUsername = users.find(user => user.username === username);
    const existingEmail = users.find(user => user.email === email);
    return existingUsername || existingEmail;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isExistingUser()) {
      toast.error("Username or email already exists.", {
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
    let selectedFac = ""; 
  
    switch (role) {
      case "Coordinator":
        selectedFac = selectedFaculty; 
        break;
      case "Admin":
        selectedFac = ""; 
        break;
      case "Student":
        selectedFac = ""; 
        break;
      case "Manager":
        selectedFac = ""; 
        break;
        case "Guest":
          selectedFac = selectedFaculty; 
          break;
      default:
        selectedFac = "";
        break;
    }
  
    try {
      const newUser = { username, email, password, role, facultyName: selectedFac };
      await axios.post("/api/users", newUser);
      onClose();
      toast.success("Add User successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Error adding user!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error adding user:", error.response.data.message);
    }
  };

  return (
    <s.Modal>
      <s.ModalContent>
        <s.ModalHeader>
          <s.ModalTitle>Add User</s.ModalTitle>
          <s.CloseButton onClick={onClose}>×</s.CloseButton>
        </s.ModalHeader>
        <s.ModalBody>
          <form onSubmit={handleSubmit}>
            <s.InputGroup>
              <s.Label>Username</s.Label>
              <s.Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </s.InputGroup>
            <s.InputGroup>
              <s.Label>Email</s.Label>
              <s.Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </s.InputGroup>
            <s.InputGroup>
              <s.Label>Password</s.Label>
              <s.Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </s.InputGroup>
            <s.InputGroup>
              <s.Label>Role</s.Label>
              <s.Select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select a role</option>
                <option value="Admin">Admin</option>
                <option value="Student">student</option>

                <option value="Coordinator">Coordinator</option>
                <option value="Manager">Manager</option>
                <option value="Guest">Guest</option>
              </s.Select>
            </s.InputGroup>
            {(role === "Coordinator" || role === "Guest") && (
              <s.InputGroup>
                <s.Label>Select Faculty</s.Label>
                <s.Select
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                >
                  <option value="">Select a faculty</option>
                  {facultyList.map((faculty) => (
                    <option key={faculty._id} value={faculty.facultyName}>
                      {faculty.facultyName}
                    </option>
                  ))}
                </s.Select>
              </s.InputGroup>
            )}
            <s.ModalFooter>
              <s.Button type="submit">Add User</s.Button>
            </s.ModalFooter>
          </form>
        </s.ModalBody>
        <ToastContainer />
      </s.ModalContent>
    </s.Modal>
  );
};

export default AddUserModal;