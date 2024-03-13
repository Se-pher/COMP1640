import React, { useState } from 'react';
import * as s from '../../../Style/PopUp';

const EditUserModal = ({ user, onClose, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ ...user, name, email, role });
    onClose();
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <s.Label>Role</s.Label>
              <s.Select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="Coordinator">Coordinator</option>
                <option value="Manager">Manager</option>
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
