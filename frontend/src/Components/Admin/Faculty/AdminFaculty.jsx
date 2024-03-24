import React, { useState, useEffect  } from "react";
import * as s from "../../../Style/Admin_faculty";
import LogoImage from "../../../Image/web.png";
import AdminAvatar from "../../../Image/facebook.png";
import Navbar from "../../Navbar";
import AddFacultyModal from "./AddFacultyModal";
import EditFacultyModal from "./EditFacultyModal";
import axios from 'axios';

const AdminFaculty = () => {
  const [selectedItem, setSelectedItem] = useState("Faculty management");
  const [showModal, setShowModal] = useState(false);
  const [facultyData, setFacultyData] = useState([]);
  const [editedFaculty, setEditedFaculty] = useState(null);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await axios.get('/api/faculties');
        setFacultyData(response.data);
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      }
    };

    fetchFacultyData();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddFaculty = async (newFaculty) => {
    try {
      const response = await axios.post('/api/faculties', newFaculty);
      const addedFaculty = response.data;
      setFacultyData((prevFacultyData) => [...prevFacultyData, addedFaculty]);
    } catch (error) {
      console.error('Error adding faculty:', error);
    }
  };

  const handleEditFaculty = (faculty) => {
    setEditedFaculty(faculty);
  };
  
  const handleUpdateFaculty = (updatedFaculty) => {
    setFacultyData(facultyData.map(faculty => (faculty._id === updatedFaculty._id ? updatedFaculty : faculty)));
  };
  
  const handleDeleteFaculty = async (facultyId) => {
    try {
      await axios.delete(`/api/faculties/${facultyId}`);
      setFacultyData(facultyData.filter(faculty => faculty._id !== facultyId));
    } catch (error) {
      console.error('Error deleting faculty:', error);
    }
  };

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
              to="/Admin/Faculty"
              onClick={() => handleItemClick("Faculty management")}
            >
              <s.SidebarItem selected={selectedItem === "Faculty management"}>
                Faculty management
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
          <s.MainMenu>
            <s.MenuTitle>More</s.MenuTitle>
            <s.StyledLink
              to="/Setting/Profile"
              onClick={() => handleItemClick("profile")}
            >
              <s.SidebarItem selected={selectedItem === "profile"}>
                Settings
              </s.SidebarItem>
            </s.StyledLink>
          </s.MainMenu>
          <s.LogoutButton>
            <s.LogoutBtn>
              <s.LogoutIcon />
              Logout
            </s.LogoutBtn>
          </s.LogoutButton>
        </s.Sidebar>
        <s.Main>
          <s.AddUserContainer>
            <s.SquareContainer>
              <s.Button onClick={openModal}>
                <s.AddUserButton>Add Faculty</s.AddUserButton>
              </s.Button>
              <s.TableContainer>
                <s.UserTable>
                  <thead>
                    <tr>
                      <s.TableHeader>Faculty ID</s.TableHeader>
                      <s.TableHeader>Faculty Name</s.TableHeader>
                      <s.TableHeader>Action</s.TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {facultyData.map((faculty) => (
                      <s.TableRow key={faculty._id}>
                        <s.TableCell>{faculty.facultyId}</s.TableCell>
                        <s.TableCell>{faculty.facultyName}</s.TableCell>
                        <s.TableCell>
                          <s.EditIcon
                            onClick={() => handleEditFaculty(faculty)}
                          />
                          <s.DeleteIcon
                            onClick={() => handleDeleteFaculty(faculty._id)}
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
        <AddFacultyModal onClose={closeModal} onAddFaculty={handleAddFaculty} />
      )}
      {editedFaculty && (
        <EditFacultyModal
          faculty={editedFaculty}
          onClose={() => setEditedFaculty(null)}
          onUpdateFaculty={handleUpdateFaculty}
        />
      )}
    </s.Container>
  );
};

export default AdminFaculty;