import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Sidebar = styled.div`
  width: 200px;
  background-color: #29325b;
  padding: 20px;
  height: 44rem;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  padding: 10px;
  cursor: pointer;
  color: #fff;
  border-radius: 10px;
  background-color: ${({ selected }) => (selected ? '#FFFFFF33' : 'initial')};
  &:hover {
    background-color: #e0e0e0;
    color: #29325b;
  }
`;

export const Main = styled.div`
  flex: 1;
  padding: 20px;
`;