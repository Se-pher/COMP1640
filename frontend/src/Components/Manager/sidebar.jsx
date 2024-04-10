import React, { useState } from "react";
import * as s from "../../Style/sidebar";
import LogoImage from "../../Image/web.png";
import AdminAvatar from "../../Image/facebook.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Sidebar = ({ selectedItem, handleItemClick, userName, handleLogout }) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showMenuIcon, setShowMenuIcon] = useState(true);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
    setShowMenuIcon(!showMenuIcon);
  };

  return (
    <>
      <s.DesktopSidebar>
        <s.Sidebar>
          <s.LogoContainer>
            <s.Logo src={LogoImage} alt="Website Logo" />
          </s.LogoContainer>
          <s.AdminInfo>
            <s.Avatar src={AdminAvatar} alt="Admin Avatar" />
            <s.AdminName>{userName}</s.AdminName>
          </s.AdminInfo>
          <s.MainMenu>
            <s.MenuTitle>Main Menu</s.MenuTitle>
            <s.StyledLink
              to="/manager"
              onClick={() => handleItemClick("View Articles")}
            >
              <s.SidebarItem selected={selectedItem === "View Articles"}>
                View Articles
              </s.SidebarItem>
            </s.StyledLink>
          </s.MainMenu>
          <s.MainMenu>
            <s.MenuTitle>More</s.MenuTitle>
            <s.StyledLink
              to="/manager/setting/profile"
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
      </s.DesktopSidebar>

      <s.MobileSidebar>
        <s.MobileSidebarOverlay
          showMobileSidebar={showMobileSidebar}
          onClick={toggleMobileSidebar}
        />
        {showMenuIcon && (
          <s.MenuIconContainer onClick={toggleMobileSidebar}>
            <MenuIcon />
          </s.MenuIconContainer>
        )}
        <s.MobileSidebarContent showMobileSidebar={showMobileSidebar}>
          <s.MobileSidebarHeader>
            {showMobileSidebar && <CloseIcon onClick={toggleMobileSidebar} />}
          </s.MobileSidebarHeader>
          <s.LogoContainer>
            <s.Logo src={LogoImage} alt="Website Logo" />
          </s.LogoContainer>
          <s.AdminInfo>
            <s.Avatar src={AdminAvatar} alt="Admin Avatar" />
            <s.AdminName>{userName}</s.AdminName>
          </s.AdminInfo>
          <s.MainMenu>
            <s.MenuTitle>Main Menu</s.MenuTitle>
            <s.StyledLink
              to="/manager"
              onClick={() => handleItemClick("View Articles")}
            >
              <s.SidebarItem selected={selectedItem === "View Articles"}>
                View Articles
              </s.SidebarItem>
            </s.StyledLink>
          </s.MainMenu>
          <s.MainMenu>
            <s.MenuTitle>More</s.MenuTitle>
            <s.StyledLink
              to="/manager/setting/profile"
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
        </s.MobileSidebarContent>
      </s.MobileSidebar>
    </>
  );
};

export default Sidebar;
