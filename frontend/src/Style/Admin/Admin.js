import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
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

export const AddUserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

export const AddUserButton = styled.button`
    background-color: #F6793E;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    width: 150px;
`;

export const Button = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-left: 54rem;
`;

export const SquareContainer = styled.div`
  width: 1100px;
  height: 650px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding-bottom: 20px;
`;

export const TableContainer = styled.div`
  margin-top: 10px;
  width: 95%;
  height: 90%;
  background-color: #fff;
  overflow-y: auto;
`;

export const UserTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #fff;
`;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: transparent;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

export const EditIcon = styled(FontAwesomeIcon).attrs({
  icon: faPen,
})`
  color: black;
  margin-right: 10px;
  cursor:pointer;
`;

export const DeleteIcon = styled(FontAwesomeIcon).attrs({
  icon: faTrash,
})`
  color: black;
  cursor:pointer;
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