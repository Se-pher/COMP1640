import styled from 'styled-components';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const Sidebar = styled.div`
  width: 200px;
  background-color: #29325b;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  margin-left: 20px;
  margin-bottom: 22px;
  height: 705px;
`;

export const DesktopSidebar = styled.div`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const MobileSidebar = styled.div`
  display: none;

  @media only screen and (max-width: 768px) {
    display: contents;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
`;

export const MobileSidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ showMobileSidebar }) => (showMobileSidebar ? 'block' : 'none')};
  z-index: 999;
`;

export const MobileSidebarContent = styled.div`
  position: fixed;
  top: 0;
  left: ${({ showMobileSidebar }) => (showMobileSidebar ? '0' : '-300px')};
  width: 200px;
  height: 100%;
  background-color: #29325b;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
`;

export const MobileSidebarHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const MenuIconContainer = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1001;
`;

export const LogoContainer = styled.div`
  margin-bottom: 20px;
`;

export const Logo = styled.img`
  width: 100px;
  height: auto;
`;

export const AdminInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

export const AdminName = styled.span`
  color: #fff;
  font-weight: bold;
`;

export const MainMenu = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const MenuTitle = styled.h3`
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const SidebarItem = styled.div`
  padding: 9px;
  cursor: pointer;
  color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: ${({ selected }) => (selected ? '#FFFFFF33' : 'initial')};
  &:hover {
    background-color: #e0e0e0;
    color: #29325b;
  }
`;

export const LogoutButton = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

export const LogoutBtn = styled.button`
  background-color: #F6793E;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  width: 150px;
`;

export const LogoutIcon = styled(FontAwesomeIcon).attrs({
  icon: faRightFromBracket,
})`
  margin-right: 5px;
`;