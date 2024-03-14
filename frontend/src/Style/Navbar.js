import styled from 'styled-components';

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    padding: 10px;
    width: 1100px;
    margin-left: 17rem;
    position: fixed;
    margin-top: 20px;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

export const NavbarItem = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  margin-right: 20px;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
`;

export const SearchIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

export const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
`;

export const NotificationIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const UserGreeting = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const WelcomeMessage = styled.span`
  font-size: 14px;
`;

export const GreetingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

