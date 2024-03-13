import React, { useState } from "react";
import * as s from "../../../Style/Admin";
import LogoImage from "../../../Image/web.png";
import AdminAvatar from "../../../Image/facebook.png";
import Navbar from "../../Navbar";

const Admin = () => {
  const [selectedItem, setSelectedItem] = useState("Account management");
  const [userData,] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      password: "password1",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Student",
      password: "password2",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Guest",
      password: "password3",
    },
    {
      id: 4,
      name: "Alice Lee",
      email: "alice@example.com",
      role: "Manager",
      password: "password4",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Admin",
      password: "password5",
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "Student",
      password: "password6",
    },
    {
      id: 7,
      name: "Daniel Martinez",
      email: "daniel@example.com",
      role: "Guest",
      password: "password7",
    },
    {
      id: 8,
      name: "Sophia Wilson",
      email: "sophia@example.com",
      role: "Manager",
      password: "password8",
    },
    {
      id: 9,
      name: "Matthew Taylor",
      email: "matthew@example.com",
      role: "Admin",
      password: "password9",
    },
    {
      id: 10,
      name: "Olivia Thomas",
      email: "olivia@example.com",
      role: "Student",
      password: "password10",
    },
    {
      id: 11,
      name: "William Jackson",
      email: "william@example.com",
      role: "Guest",
      password: "password11",
    },
    {
      id: 12,
      name: "Isabella White",
      email: "isabella@example.com",
      role: "Manager",
      password: "password12",
    },
    {
      id: 13,
      name: "James Harris",
      email: "james@example.com",
      role: "Admin",
      password: "password13",
    },
    {
      id: 14,
      name: "Amelia Nelson",
      email: "amelia@example.com",
      role: "Student",
      password: "password14",
    },
    {
      id: 15,
      name: "Benjamin Carter",
      email: "benjamin@example.com",
      role: "Guest",
      password: "password15",
    },
    {
      id: 16,
      name: "Mia Perez",
      email: "mia@example.com",
      role: "Manager",
      password: "password16",
    },
    {
      id: 17,
      name: "Ethan Roberts",
      email: "ethan@example.com",
      role: "Admin",
      password: "password17",
    },
    {
      id: 18,
      name: "Emma Garcia",
      email: "emma@example.com",
      role: "Student",
      password: "password18",
    },
    {
      id: 19,
      name: "Alexander King",
      email: "alexander@example.com",
      role: "Guest",
      password: "password19",
    },
    {
      id: 20,
      name: "Ava Wright",
      email: "ava@example.com",
      role: "Manager",
      password: "password20",
    },
    {
      id: 21,
      name: "Logan Anderson",
      email: "logan@example.com",
      role: "Admin",
      password: "password21",
    },
    {
      id: 22,
      name: "Charlotte Martinez",
      email: "charlotte@example.com",
      role: "Student",
      password: "password22",
    },
    {
      id: 23,
      name: "Liam Davis",
      email: "liam@example.com",
      role: "Guest",
      password: "password23",
    },
  ]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };


  return (
    <s.Container>
      <Navbar />
      <s.MainContent>
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
              onClick={() => handleItemClick("Account management")}
              selected={selectedItem === "Account management"}
            >
              Account management
            </s.SidebarItem>
            <s.SidebarItem
              onClick={() => handleItemClick("Content management")}
              selected={selectedItem === "Content management"}
            >
              Content management
            </s.SidebarItem>
            <s.SidebarItem
              onClick={() => handleItemClick("System settings")}
              selected={selectedItem === "System settings"}
            >
              System settings
            </s.SidebarItem>
          </s.MainMenu>
        </s.Sidebar>
        <s.Main>
          <s.AddUserContainer>
            <s.SquareContainer>
              <s.Button>
                <s.AddUserButton>Add User</s.AddUserButton>
              </s.Button>
              <s.TableContainer>
                <s.UserTable>
                  <thead>
                    <tr>
                      <s.TableHeader>ID</s.TableHeader>
                      <s.TableHeader>Name</s.TableHeader>
                      <s.TableHeader>Email</s.TableHeader>
                      <s.TableHeader>Role</s.TableHeader>
                      <s.TableHeader>Action</s.TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((user) => (
                      <s.TableRow key={user.id}>
                        <s.TableCell>{user.id}</s.TableCell>
                        <s.TableCell>{user.name}</s.TableCell>
                        <s.TableCell>{user.email}</s.TableCell>
                        <s.TableCell>{user.role}</s.TableCell>
                        <s.TableCell>
                          <s.EditIcon/>
                          <s.DeleteIcon/>
                        </s.TableCell>
                      </s.TableRow>
                    ))}
                  </tbody>
                </s.UserTable>
              </s.TableContainer>
            </s.SquareContainer>
          </s.AddUserContainer>
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Admin;
