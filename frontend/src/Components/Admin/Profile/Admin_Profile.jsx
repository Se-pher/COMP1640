import React, { useState } from "react";
import * as s from "../../../Style/Profile";
import LogoImage from "../../../Image/web.png";
import AdminAvatar from "../../../Image/facebook.png";
import Navbar from "../../Navbar";

const Admin_Profile = () => {
    const [selectedItem, setSelectedItem] = useState("profile");
    const handleItemClick = (item) => {
        setSelectedItem(item);
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
              to="/Coordinator"
              onClick={() => handleItemClick("Dash Broad")}
            >
              <s.SidebarItem selected={selectedItem === "Dash Broad"}>
              Dash Broad
              </s.SidebarItem>
            </s.StyledLink>
            <s.StyledLink
              to="/Admin/Faculty"
              onClick={() => handleItemClick("Articles")}
            >
              <s.SidebarItem selected={selectedItem === "Articles"}>
              Articles
              </s.SidebarItem>
            </s.StyledLink>
            <s.StyledLink
              to="/system-settings"
              onClick={() => handleItemClick("Export Report")}
            >
              <s.SidebarItem selected={selectedItem === "Export Report"}>
                Export Report
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

            </s.SquareContainer>
          </s.AddUserContainer>
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Admin_Profile;
