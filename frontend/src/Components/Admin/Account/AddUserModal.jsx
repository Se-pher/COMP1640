import React, { useState, useEffect } from "react";
import * as s from "../../../Style/PopUp";
import axios from 'axios';

const AddUserModal = ({ onClose, onAddUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get('/api/faculties');
        setFaculties(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFaculties();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, email, password, role, facultyName };
    onAddUser(newUser);
    onClose();
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
                <option value="admin">Admin</option>
                <option value="student">student</option>
                <option value="Coordinator">Coordinator</option>
                <option value="Manager">Manager</option>
              </s.Select>
            </s.InputGroup>
            <s.InputGroup>
              <s.Label>Faculty Name</s.Label>
              <s.Select value={facultyName} onChange={(e) => setFacultyName(e.target.value)}>
                {faculties.map(faculty => (
                  <option key={faculty._id} value={faculty.facultyName}>
                    {faculty.facultyName}
                  </option>
                ))}
              </s.Select>
            </s.InputGroup>
            <s.ModalFooter>
              <s.Button type="submit">Add User</s.Button>
            </s.ModalFooter>
          </form>
        </s.ModalBody>
      </s.ModalContent>
    </s.Modal>
  );
};

export default AddUserModal;