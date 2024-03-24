import styled from 'styled-components';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #EAEBEF;
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  margin-top: 20px;
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
  background-color: ${({ selected }) => (selected ? '#FFFFFF33' : 'initial')};
  &:hover {
    background-color: #e0e0e0;
    color: #29325b;
  }
`;

export const Main = styled.div`
  flex: 1;
  padding: 20px;
  margin-right: 20px;
  margin-top: 50px;
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
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

export const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
`;

export const DataContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
`;

export const NewPostsContainer = styled.div`
  width: 45%;
`;

export const SectionTitle = styled.h3`
  color: #29325b;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PostItem = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
`;

export const PostTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  color: #29325b;
`;

export const PostAuthor = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

export const FacultyCountsContainer = styled.div`
  width: 45%;
`;

export const FacultyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FacultyItem = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FacultyName = styled.span`
  font-weight: bold;
  color: #29325b;
`;

export const FacultyCount = styled.span`
  color: #666;
`;

export const ChartContainerWrapper = styled.div`
  width: 100%;
  max-width: -webkit-fill-available;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const LowerContainersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
`;

export const DataContainerWrapper = styled.div`
  width: 47%;
  height: 280px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

export const FacultyCountsContainerWrapper = styled.div`
  width: 48%;
  height: 280px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;