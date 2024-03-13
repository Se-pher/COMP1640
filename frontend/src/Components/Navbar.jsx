import React from 'react';
import * as s from '../Style/Navbar';
import NotificationIcon from "../Image/Notification.png";
import SearchIcon from "../Image/Search.png";

const Navbar = ({ username }) => {
  return (
    <s.NavbarContainer>
      <s.LeftSection>
        <s.GreetingContainer>
          <s.UserGreeting>Hi, {username}!</s.UserGreeting>
          <s.WelcomeMessage>Welcome back</s.WelcomeMessage>
        </s.GreetingContainer>
      </s.LeftSection>
      <s.RightSection>
        <s.SearchBar>
          <s.SearchIcon src={SearchIcon} alt="Search" />
          <s.SearchInput type="text" placeholder="Search..." />
        </s.SearchBar>
        <s.NotificationItem>
          <s.NotificationIcon src={NotificationIcon} alt="Notification" />
        </s.NotificationItem>
      </s.RightSection>
    </s.NavbarContainer>
  );
};

export default Navbar;