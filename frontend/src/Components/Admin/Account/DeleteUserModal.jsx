import React from 'react';
import * as s from '../../../Style/PopUp';
import axios from 'axios';

const DeleteUserModal = ({ onClose, onDeleteUser, user }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/users/${user._id}`);
      onDeleteUser(user._id);
      onClose();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

    return (
      <s.Modal>
        <s.ModalContent>
          <s.ModalHeader>
            <s.ModalTitle>Delete User</s.ModalTitle>
            <s.CloseButton onClick={onClose}>×</s.CloseButton>
          </s.ModalHeader>
          <s.ModalBody>
            <p>Are you sure you want to delete {user && user.name}?</p>
          </s.ModalBody>
          <s.ModalFooter>
            <s.Button onClick={handleDelete}>Delete</s.Button>
          </s.ModalFooter>
        </s.ModalContent>
      </s.Modal>
    );
  };

  export default DeleteUserModal;