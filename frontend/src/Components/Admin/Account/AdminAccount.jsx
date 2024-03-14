import React, { useState, useEffect } from "react";
import * as s from "../../../Style/Admin";
import LogoImage from "../../../Image/web.png";
import AdminAvatar from "../../../Image/facebook.png";
import Navbar from "../../Navbar";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const Admin = () => {
  const [selectedItem, setSelectedItem] = useState("Account management");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteUserModalVisible, setDeleteUserModalVisible] = useState(false);
  const [userData, setUserData] = useState([]);

  const [showPasswordState, setShowPasswordState] = useState({});

  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        setUserData(response.data);
        const initialShowPasswordState = response.data.reduce((acc, user) => {
          acc[user._id] = false;
          return acc;
        }, {});
        setShowPasswordState(initialShowPasswordState);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const togglePasswordVisibility = (userId) => {
    setShowPasswordState({
      ...showPasswordState,
      [userId]: !showPasswordState[userId],
    });
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleAddUser = (newUser) => {
    setUserData([...userData, newUser]);
  };

  const handleEditUser = (user) => {
    setEditedUser(user);
    setShowEditModal(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setUserData(
      userData.map((user) => (user.id === updatedUser.id ? updatedUser : user))
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
    const index = userData.findIndex((user) => user.id === userId);
    if (index !== -1) {
      const updatedUserData = [
        ...userData.slice(0, index),
        ...userData.slice(index + 1),
      ]; 
      for (let i = index; i < updatedUserData.length; i++) {
        updatedUserData[i].id = i + 1;
      }
      setUserData(updatedUserData);
    }
  };

  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <s.Container>
      <Navbar />
      <s.MainContent>
        <s.Sidebar>
          <s.LogoContainer>
            <s.Logo src={LogoImage} alt="Website Logo" />
          </s.LogoContainer>
          <s.AdminInfo>
            <s.Avatar src={AdminAvatar} alt="Admin Avatar" />
            <s.AdminName>John Doe</s.AdminName>
          </s.AdminInfo>
          <s.MainMenu>
            <s.MenuTitle>Main Menu</s.MenuTitle>
            <s.StyledLink
              to="/Admin"
              onClick={() => handleItemClick("Account management")}
            >
              <s.SidebarItem selected={selectedItem === "Account management"}>
                Account management
              </s.SidebarItem>
            </s.StyledLink>
            <s.StyledLink
              to="/Admin/content"
              onClick={() => handleItemClick("Content management")}
            >
              <s.SidebarItem selected={selectedItem === "Content management"}>
                Content management
              </s.SidebarItem>
            </s.StyledLink>
            <s.StyledLink
              to="/system-settings"
              onClick={() => handleItemClick("System settings")}
            >
              <s.SidebarItem selected={selectedItem === "System settings"}>
                System settings
              </s.SidebarItem>
            </s.StyledLink>
          </s.MainMenu>
        </s.Sidebar>
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
                      <s.TableHeader>Password</s.TableHeader>
                      <s.TableHeader>facultyId</s.TableHeader>
                      <s.TableHeader>Action</s.TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((user) => (
                      <s.TableRow key={user.id}>
                        <s.TableCell>{user.id}</s.TableCell>
                        <s.TableCell>{user.username}</s.TableCell>
                        <s.TableCell>{user.email}</s.TableCell>
                        <s.TableCell>{user.role}</s.TableCell>
                        <s.TableCell>
                          {showPasswordState[user.id]
                            ? user.password
                            : "*".repeat(user.password.length)}
                          {showPasswordState[user.id] ? (
                            <FontAwesomeIcon
                              icon={faEyeSlash}
                              onClick={() => togglePasswordVisibility(user.id)}
                              style={{
                                marginLeft: "10px",
                                marginBottom: "2px",
                              }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faEye}
                              onClick={() => togglePasswordVisibility(user.id)}
                              style={{
                                marginLeft: "10px",
                                marginBottom: "2px",
                              }}
                            />
                          )}
                        </s.TableCell>
                        <s.TableCell>{user.facultyId}</s.TableCell>
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
