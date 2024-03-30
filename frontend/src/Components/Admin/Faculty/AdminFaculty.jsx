import React, { useState, useEffect  } from "react";
import * as s from "../../../Style/Admin/Admin_faculty";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import AddFacultyModal from "./AddFacultyModal";
import EditFacultyModal from "./EditFacultyModal";
import axios from 'axios';

const AdminFaculty = () => {
  const [selectedItem, setSelectedItem] = useState("Faculty management");
  const [showModal, setShowModal] = useState(false);
  const [facultyData, setFacultyData] = useState([]);
  const [editedFaculty, setEditedFaculty] = useState(null);
  const [userName, setUserName] = useState('');

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
    window.location.href = '/login';
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