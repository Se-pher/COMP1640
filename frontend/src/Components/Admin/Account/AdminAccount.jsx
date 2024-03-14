import React, { useState } from "react";
import * as s from "../../../Style/Admin";
import LogoImage from "../../../Image/web.png";
import AdminAvatar from "../../../Image/facebook.png";
import Navbar from "../../Navbar";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Admin = () => {
  const [selectedItem, setSelectedItem] = useState("Account management");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteUserModalVisible, setDeleteUserModalVisible] = useState(false);
  const [userData, setUserData] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      password: "password1",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Student",
      password: "password2",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Guest",
      password: "password3",
    },
    {
      id: 4,
      name: "Alice Lee",
      email: "alice@example.com",
      role: "Manager",
      password: "password4",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Admin",
      password: "password5",
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "Student",
      password: "password6",
    },
    {
      id: 7,
      name: "Daniel Martinez",
      email: "daniel@example.com",
      role: "Guest",
      password: "password7",
    },
    {
      id: 8,
      name: "Sophia Wilson",
      email: "sophia@example.com",
      role: "Manager",
      password: "password8",
    },
    {
      id: 9,
      name: "Matthew Taylor",
      email: "matthew@example.com",
      role: "Admin",
      password: "password9",
    },
    {
      id: 10,
      name: "Olivia Thomas",
      email: "olivia@example.com",
      role: "Student",
      password: "password10",
    },
    {
      id: 11,
      name: "William Jackson",
      email: "william@example.com",
      role: "Guest",
      password: "password11",
    },
    {
      id: 12,
      name: "Isabella White",
      email: "isabella@example.com",
      role: "Manager",
      password: "password12",
    },
    {
      id: 13,
      name: "James Harris",
      email: "james@example.com",
      role: "Admin",
      password: "password13",
    },
    {
      id: 14,
      name: "Amelia Nelson",
      email: "amelia@example.com",
      role: "Student",
      password: "password14",
    },
    {
      id: 15,
      name: "Benjamin Carter",
      email: "benjamin@example.com",
      role: "Guest",
      password: "password15",
    },
    {
      id: 16,
      name: "Mia Perez",
      email: "mia@example.com",
      role: "Manager",
      password: "password16",
    },
    {
      id: 17,
      name: "Ethan Roberts",
      email: "ethan@example.com",
      role: "Admin",
      password: "password17",
    },
    {
      id: 18,
      name: "Emma Garcia",
      email: "emma@example.com",
      role: "Student",
      password: "password18",
    },
    {
      id: 19,
      name: "Alexander King",
      email: "alexander@example.com",
      role: "Guest",
      password: "password19",
    },
    {
      id: 20,
      name: "Ava Wright",
      email: "ava@example.com",
      role: "Manager",
      password: "password20",
    },
    {
      id: 21,
      name: "Logan Anderson",
      email: "logan@example.com",
      role: "Admin",
      password: "password21",
    },
    {
      id: 22,
      name: "Charlotte Martinez",
      email: "charlotte@example.com",
      role: "Student",
      password: "password22",
    },
    {
      id: 23,
      name: "Liam Davis",
      email: "liam@example.com",
      role: "Guest",
      password: "password23",
    },
  ]);

  const [showPasswordState, setShowPasswordState] = useState(
    userData.reduce((acc, user) => {
      acc[user.id] = false;
      return acc;
    }, {})
  );

  const [editedUser, setEditedUser] = useState(null);

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
    setUserData([...userData, { id: userData.length + 1, ...newUser }]);
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
                      <s.TableHeader>Action</s.TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((user) => (
                      <s.TableRow key={user.id}>
                        <s.TableCell>{user.id}</s.TableCell>
                        <s.TableCell>{user.name}</s.TableCell>
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
                              style={{ marginLeft: "10px", marginBottom: "2px" }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faEye}
                              onClick={() => togglePasswordVisibility(user.id)}
                              style={{ marginLeft: "10px", marginBottom: "2px" }}
                            />
                          )}
                        </s.TableCell>
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
          user={selectedUser} // Truyền dữ liệu người dùng vào DeleteUserModal
        />
      )}
    </s.Container>
  );
};

export default Admin;
