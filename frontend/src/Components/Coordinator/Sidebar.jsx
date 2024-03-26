import React from 'react';
import * as s from '../../Style/sidebar';
import LogoImage from '../../Image/web.png';
import AdminAvatar from '../../Image/facebook.png';

const Sidebar = ({ selectedItem, handleItemClick }) => {
  return (
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
          to="/Coordinator/Articles"
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
          onClick={() => handleItemClick("Profile")}
        >
          <s.SidebarItem selected={selectedItem === "Profile"}>
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
  );
};

export default Sidebar;