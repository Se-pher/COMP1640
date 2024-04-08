import React, { useState, useEffect } from "react";
import * as s from "../../../Style/Admin/Admin";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import axios from 'axios';

const Admin = () => {
  const [selectedItem, setSelectedItem] = useState("Account management");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteUserModalVisible, setDeleteUserModalVisible] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState('');
  const [editedUser, setEditedUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUserData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleAddUser = async (user) => {
    try {
      const response = await axios.post('/api/users', user);
      const addedUser = response.data;
      setUserData([...userData, addedUser]);
      closeModal();
    } catch (err) {
      console.error("Failed to add user:", err.response.data.message);
    }
  };
  const handleEditUser = (user) => {
    setEditedUser(user);
    setShowEditModal(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setUserData(
      userData.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const openDeleteUserModal = (user) => {
    setSelectedUser(user);
    setDeleteUserModalVisible(true);
  };

  const closeDeleteUserModal = () => {
    setDeleteUserModalVisible(false);
  };

  const handleDeleteUser = (userId) => {
    const updatedUserData = userData.filter((user) => user._id !== userId);
    setUserData(updatedUserData);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      fetchUsername(token);
    }
  }, []);

  const fetchUsername = async (token) => {
    try {
      const response = await axios.get('/api/decode-token', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserName(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = '/'; 
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
          <s.AddUserContainer>
            <s.SquareContainer>
              <s.Button onClick={openModal}>
                <s.AddUserButton>Add User</s.AddUserButton>
              </s.Button>
              <s.TableContainer>
                <s.UserTable>
                  <thead>
                    <tr>
                      <s.TableHeader>ID</s.TableHeader>
                      <s.TableHeader>Name</s.TableHeader>
                      <s.TableHeader>Email</s.TableHeader>
                      <s.TableHeader>Role</s.TableHeader>
                      <s.TableHeader>Action</s.TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((user, index) => (
                      <s.TableRow key={user._id}>
                        <s.TableCell>{index + 1}</s.TableCell>
                        <s.TableCell>{user.username}</s.TableCell>
                        <s.TableCell>{user.email}</s.TableCell>
                        <s.TableCell>{user.role}</s.TableCell>
                        <s.TableCell>
                          <s.EditIcon onClick={() => handleEditUser(user)} />
                          <s.DeleteIcon
                            onClick={() => openDeleteUserModal(user)}
                          />
                        </s.TableCell>
                      </s.TableRow>
                    ))}
                  </tbody>
                </s.UserTable>
              </s.TableContainer>
            </s.SquareContainer>
          </s.AddUserContainer>
        </s.Main>
      </s.MainContent>
      {showModal && (
        <AddUserModal onClose={closeModal} onAddUser={handleAddUser} />
      )}
      {showEditModal && (
        <EditUserModal
          onClose={closeEditModal}
          onUpdateUser={handleUpdateUser}
          user={editedUser}
        />
      )}

      {deleteUserModalVisible && (
        <DeleteUserModal
          onClose={closeDeleteUserModal}
          onDeleteUser={handleDeleteUser}
          user={selectedUser}
        />
      )}
    </s.Container>
  );
};

export default Admin;
