import React from 'react';
import * as s from '../../Style/sidebar';
import LogoImage from '../../Image/web.png';
import AdminAvatar from '../../Image/facebook.png';

const Sidebar = ({ selectedItem, handleItemClick, userName, handleLogout }) => {
  return (
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
        <s.StyledLink
          to="/Manager/DownloadedArticles"
          onClick={() => handleItemClick("Download Articles")}
        >
          <s.SidebarItem selected={selectedItem === "Download Articles"}>
          Download Articles
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
  );
};

export default Sidebar;