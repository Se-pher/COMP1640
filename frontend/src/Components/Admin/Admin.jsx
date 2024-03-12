// Admin.js
import React, { useState } from 'react';
import * as s from '../../Style/Admin';
import LogoImage from '../../Image/web.png';
import AdminAvatar from '../../Image/facebook.png';

const Admin = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <s.Container>
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
          <s.SidebarItem
            onClick={() => handleItemClick('Dashboard')}
            selected={selectedItem === 'Dashboard'}
          >
            Dashboard
          </s.SidebarItem>
          <s.SidebarItem
            onClick={() => handleItemClick('Users')}
            selected={selectedItem === 'Users'}
          >
            Users
          </s.SidebarItem>
          <s.SidebarItem
            onClick={() => handleItemClick('Products')}
            selected={selectedItem === 'Products'}
          >
            Products
          </s.SidebarItem>
        </s.MainMenu>
      </s.Sidebar>
      <s.Main>
        {/* Nội dung chính */}
        <h1>Welcome to Admin Page</h1>
        <p>This is the main content area.</p>
      </s.Main>
    </s.Container>
  );
};

export default Admin;
