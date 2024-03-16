import React, { useState } from "react";
import * as s from "../../../Style/Admin_category";
import LogoImage from "../../../Image/web.png";
import AdminAvatar from "../../../Image/facebook.png";
import Navbar from "../../Navbar";

const AdminCategories = () => {
    const [selectedItem, setSelectedItem] = useState("Category management");


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
              to="/Admin"
              onClick={() => handleItemClick("Account management")}
            >
              <s.SidebarItem selected={selectedItem === "Account management"}>
                Account management
              </s.SidebarItem>
            </s.StyledLink>
            <s.StyledLink
              to="/Admin/Category"
              onClick={() => handleItemClick("Category management")}
            >
              <s.SidebarItem selected={selectedItem === "Category management"}>
              Category management
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
              to="/setting"
              onClick={() => handleItemClick("Settings")}
            >
              <s.SidebarItem selected={selectedItem === "Settings"}>
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

export default AdminCategories;