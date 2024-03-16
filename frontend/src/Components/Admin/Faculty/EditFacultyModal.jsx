import React, { useState } from 'react';
import * as s from '../../../Style/PopUp';
import axios from 'axios';

const EditFacultyModal = ({ faculty, onClose, onUpdateFaculty }) => {
  const [facultyId, setFacultyId] = useState(faculty.facultyId);
  const [facultyName, setFacultyName] = useState(faculty.facultyName);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFaculty = { facultyId, facultyName };
      const response = await axios.put(`/api/faculties/${faculty._id}`, updatedFaculty);
      onUpdateFaculty(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating faculty:', error);
    }
  };

  return (
    <s.Modal>
      <s.ModalContent>
        <s.ModalHeader>
          <s.ModalTitle>Edit Faculty</s.ModalTitle>
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
            <s.ModalFooter>
              <s.Button type="submit">Save Changes</s.Button>
            </s.ModalFooter>
          </form>
        </s.ModalBody>
      </s.ModalContent>
    </s.Modal>
  );
};

export default EditFacultyModal;