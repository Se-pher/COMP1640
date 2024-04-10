import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
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
  overflow-x:auto;
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