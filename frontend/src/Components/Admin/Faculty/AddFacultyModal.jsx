import React, { useState, useEffect } from "react";
import * as s from "../../../Style/PopUp";
import axios from 'axios';

const AddFacultyModal = ({ onClose, onAddFaculty }) => {
  const [facultyId, setFacultyId] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [coordinatorId, setCoordinatorId] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data.filter(user => user.role === 'Coordinator'));
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFaculty = { facultyId, facultyName, coordinatorId };
    onAddFaculty(newFaculty);
    onClose();
  };

  return (
    <s.Modal>
      <s.ModalContent>
        <s.ModalHeader>
          <s.ModalTitle>Add Faculty</s.ModalTitle>
          <s.CloseButton onClick={onClose}>×</s.CloseButton>
        </s.ModalHeader>
        <s.ModalBody>
          <form onSubmit={handleSubmit}>
            <s.InputGroup>
              <s.Label>Faculty ID</s.Label>
              <s.Input
                type="text"
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
              />
            </s.InputGroup>
            <s.InputGroup>
              <s.Label>Faculty Name</s.Label>
              <s.Input
                type="text"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
              />
            </s.InputGroup>
            <s.InputGroup>
              <s.Label>Coordinator</s.Label>
              <s.Select
                value={coordinatorId}
                onChange={(e) => setCoordinatorId(e.target.value)}
              >
                <option value="">Select Coordinator</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </s.Select>
            </s.InputGroup>
            <s.ModalFooter>
              <s.Button type="submit">Add Faculty</s.Button>
            </s.ModalFooter>
          </form>
        </s.ModalBody>
      </s.ModalContent>
    </s.Modal>
  );
};

export default AddFacultyModal;