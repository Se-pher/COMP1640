import React, { useState, useEffect } from "react";
import * as s from '../Style/Navbar';
import NotificationIcon from "../Image/Notification.png";
import SearchIcon from "../Image/Search.png";
import axios from 'axios';
const Navbar = ({ username }) => {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      fetchUsername(token);
    }
  }, []);

  const fetchUsername = async (token) => {
    try {
      const response = await axios.get('/api/decode-token', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserName(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error.response.data.message);
    }
  };
  return (
    <s.NavbarContainer>
      <s.LeftSection>
        <s.GreetingContainer>
          <s.UserGreeting>Hi, {userName}!</s.UserGreeting>
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