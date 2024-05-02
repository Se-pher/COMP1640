import React, { useState, useEffect } from "react";
import * as s from "../../../Style/Profile";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import axios from "axios";

const Student_Profile = () => {
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
        setToken(token);
        const response = await axios.get("/api/user/profile", {
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
      const response = await axios.put(
        "/api/user/profile",
        {
          name: newName,
          email: newEmail,
          password: newPassword,
          currentPassword: currentPassword, 
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
    window.location.href = "/";
  };

  return (
    <s.Container>
      <Navbar />
      <s.MainContent>
        <Sidebar
          selectedItem={selectedItem}
          handleItemClick={handleItemClick}
          userName={userProfile.username}
          handleLogout={handleLogout}
        />
        <s.Main>
          <s.AddUserContainer>
            <s.SquareContainer>
              <s.ProfileContainer>
                <s.ProfileHeader>Personal Profile</s.ProfileHeader>
                <s.UserInfoSection>
                  <s.UserInfoField>
                    <s.FieldLabel>Name</s.FieldLabel>
                    <s.FieldInput
                      placeholder={userProfile.username}
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </s.UserInfoField>

                  <s.UserInfoField>
                    <s.FieldLabel>Email</s.FieldLabel>
                    <s.FieldInput
                      placeholder={userProfile.email}
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </s.UserInfoField>

                  <s.UserInfoField>
                    <s.FieldLabel>Current Password</s.FieldLabel>
                    <s.FieldInput
                      placeholder="Enter Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      type="password"
                    />
                  </s.UserInfoField>
                  <s.UserInfoField>
                    <s.FieldLabel>New Password</s.FieldLabel>
                    <s.FieldInput
                      placeholder="********"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      type="password"
                    />
                  </s.UserInfoField>

                  {(newName !== userProfile.name ||
                    newEmail !== userProfile.email ||
                    newPassword !== "") && (
                    <s.DiscardButton onClick={handleDiscard}>
                      Discard All
                    </s.DiscardButton>
                  )}

                  <s.SaveButton onClick={handleSave}>Save</s.SaveButton>
                </s.UserInfoSection>
              </s.ProfileContainer>
            </s.SquareContainer>
          </s.AddUserContainer>
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Student_Profile;
