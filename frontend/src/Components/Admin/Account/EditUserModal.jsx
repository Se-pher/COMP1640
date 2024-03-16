import React, { useState, useEffect } from 'react';
import * as s from '../../../Style/PopUp';
import axios from 'axios';

const EditUserModal = ({ user, onClose, onUpdateUser }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [role, setRole] = useState(user.role);
  const [facultyName, setFacultyName] = useState(user.facultyName);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { username, email, password, role, facultyName };
      const response = await axios.put(`/api/users/${user._id}`, updatedUser);
      onUpdateUser(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <s.Modal>
      <s.ModalContent>
        <s.ModalHeader>
          <s.ModalTitle>Edit User</s.ModalTitle>
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
                <option value="student">Student</option>
                <option value="Coordinator">Coordinator</option>
                <option value="Manager">Manager</option>
              </s.Select>
            </s.InputGroup>
            <s.InputGroup>
              <s.Label>Faculty Name</s.Label>
              <s.Select value={facultyName} onChange={(e) => setFacultyName(e.target.value)}>
                <option value="">Select a faculty</option>
                {faculties.map(faculty => (
                  <option key={faculty._id} value={faculty.facultyName}>
                    {faculty.facultyName}
                  </option>
                ))}
              </s.Select>
            </s.InputGroup>
            <s.ModalFooter>
              <s.Button type="submit">Save Changes</s.Button>
            </s.ModalFooter>
          </form>
        </s.ModalBody>
      </s.ModalContent>
    </s.Modal>
  );
};

export default EditUserModal;