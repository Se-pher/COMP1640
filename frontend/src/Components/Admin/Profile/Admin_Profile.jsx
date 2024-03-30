import React, { useState, useEffect } from "react";
import * as s from "../../../Style/Profile";
import LogoImage from "../../../Image/web.png";
import AdminAvatar from "../../../Image/facebook.png";
import Navbar from "../../Navbar";
import axios from "axios";
const Admin_Profile = () => {
  const [selectedItem, setSelectedItem] = useState("profile");
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const [userProfile, setUserProfile] = useState({});
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const handleSave = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.put(
        "/api/user/decode-update",
        {
          name: newName,
          email: newEmail,
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Updated user profile:", response.data);
      // Optionally update state or show a success message
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Handle error (e.g., display error message)
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get("/api/decode-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User profile data from backend:", response.data);

      setUserProfile(response.data);
      setNewName(response.data.username);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleDiscard = () => {
    setNewName(userProfile.name);
    setNewEmail(userProfile.email);
    setCurrentPassword("");
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
        <s.Sidebar>
          <s.LogoContainer>
            <s.Logo src={LogoImage} alt="Website Logo" />
          </s.LogoContainer>
          <s.AdminInfo>
            <s.Avatar src={AdminAvatar} alt="Admin Avatar" />
            <s.AdminName>Joe</s.AdminName>
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
          <s.LogoutButton onClick={handleLogout}>
            <s.LogoutBtn>
              <s.LogoutIcon />
              Logout
            </s.LogoutBtn>
          </s.LogoutButton>
        </s.Sidebar>
        <s.Main>
          <s.AddUserContainer>
            <s.SquareContainer>
              <s.ProfileContainer>
                <s.ProfileHeader>Personal Profile</s.ProfileHeader>
                <s.AvatarSection>
                  <s.Avatar src={AdminAvatar} alt="Admin Avatar" />
                  <s.AvatarButtons>
                    <s.AvatarButton>Change Photo</s.AvatarButton>
                    <s.AvatarButton>Delete</s.AvatarButton>
                  </s.AvatarButtons>
                </s.AvatarSection>

                <s.UserInfoSection>
                  <s.UserInfoField>
                    <s.FieldLabel>Name</s.FieldLabel>
                    <s.FieldInput
                      placeholder={userProfile.name}
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
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      type="password"
                    />
                  </s.UserInfoField>
                  <s.UserInfoField>
                    <s.FieldLabel>Password</s.FieldLabel>
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

export default Admin_Profile;
