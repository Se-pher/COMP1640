import React, { useState, useEffect } from "react";
import * as s from "../../../Style/Profile";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import axios from "axios";

const Manager_Profile = () => {
  const [selectedItem, setSelectedItem] = useState("profile");
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const [userProfile, setUserProfile] = useState({});
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        setToken(token); // Store token from localStorage
        // Update the API endpoint if necessary to match the manager's profile endpoint
        const response = await axios.get("/api/manager/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data);
        setNewName(response.data.name);
        setNewEmail(response.data.email);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      // Ensure the API endpoint is correct for updating a manager's profile
      const response = await axios.put(
        "/api/manager/profile",
        {
          name: newName,
          email: newEmail,
          password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserProfile(response.data);
      setNewPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDiscard = () => {
    setNewName(userProfile.name);
    setNewEmail(userProfile.email);
    setNewPassword("");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };

  return (
    <s.Container>
      <Navbar />
      <s.MainContent>
        <Sidebar
          selectedItem={selectedItem}
          handleItemClick={handleItemClick}
          userName={userProfile.username} // This might need adjustment if the manager profile has different fields
          handleLogout={handleLogout}
        />
        <s.Main>
          <s.AddUserContainer>
            <s.SquareContainer>
              <s.ProfileContainer>
                <s.ProfileHeader>Manager Profile</s.ProfileHeader>
                <s.UserInfoSection>
                  {/* Form fields */}
                </s.UserInfoSection>
              </s.ProfileContainer>
            </s.SquareContainer>
          </s.AddUserContainer>
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Manager_Profile;
