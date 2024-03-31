import React, { useState } from "react";
import * as s from "../../../Style/PopUp";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddFacultyModal = ({ onClose, onAddFaculty }) => {
  const [facultyId, setFacultyId] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [deadline, setDeadline] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFaculty = { facultyId, facultyName, facultyDeadline: deadline };
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
              <s.Label>Set Deadline</s.Label>
              <DatePicker
                selected={deadline}
                minDate={new Date()}
                onChange={(date) => setDeadline(date)}
                dateFormat="dd/MM/yyyy"
              />
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