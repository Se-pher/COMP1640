import React, { useState } from "react";
import * as s from "../../../Style/Dashboard";
import LogoImage from "../../../Image/web.png";
import AdminAvatar from "../../../Image/facebook.png";
import Navbar from "../../Navbar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Coordinator_Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState("Dash Broad");
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const [chartData, setChartData] = useState([
    { day: "Monday", value: 10 },
    { day: "Tuesday", value: 15 },
    { day: "Wednesday", value: 12 },
    { day: "Thursday", value: 18 },
    { day: "Friday", value: 20 },
    { day: "Saturday", value: 25 },
    { day: "Sunday", value: 22 },
  ]);

  const [newPosts, setNewPosts] = useState([
    { id: 1, title: "Post 1", author: "John Doe" },
    { id: 2, title: "Post 2", author: "Jane Smith" },
    { id: 3, title: "Post 3", author: "Bob Johnson" },
  ]);

  const [facultyCounts, setFacultyCounts] = useState([
    { faculty: "Faculty of Arts", count: 25 },
    { faculty: "Faculty of Science", count: 32 },
    { faculty: "Faculty of Engineering", count: 18 },
  ]);
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
            <s.StyledLink
              to="/Coordinator"
              onClick={() => handleItemClick("Dash Broad")}
            >
              <s.SidebarItem selected={selectedItem === "Dash Broad"}>
                Dash Broad
              </s.SidebarItem>
            </s.StyledLink>
            <s.StyledLink
              to="/Coordinator/Articles"
              onClick={() => handleItemClick("Articles")}
            >
              <s.SidebarItem selected={selectedItem === "Articles"}>
                Articles
              </s.SidebarItem>
            </s.StyledLink>
            <s.StyledLink
              to="/system-settings"
              onClick={() => handleItemClick("Export Report")}
            >
              <s.SidebarItem selected={selectedItem === "Export Report"}>
                Export Report
              </s.SidebarItem>
            </s.StyledLink>
          </s.MainMenu>
          <s.MainMenu>
            <s.MenuTitle>More</s.MenuTitle>
            <s.StyledLink
              to="/Setting/Profile"
              onClick={() => handleItemClick("Profile")}
            >
              <s.SidebarItem selected={selectedItem === "Profile"}>
                Settings
              </s.SidebarItem>
            </s.StyledLink>
          </s.MainMenu>
          <s.LogoutButton>
            <s.LogoutBtn>
              <s.LogoutIcon />
              Logout
            </s.LogoutBtn>
          </s.LogoutButton>
        </s.Sidebar>
        <s.Main>
          <s.DashboardContainer>
            <s.ChartContainerWrapper>
              <s.ChartContainer>
                <Bar
                  data={{
                    labels: chartData.map((data) => data.day),
                    datasets: [
                      {
                        label: "Number of Posts",
                        data: chartData.map((data) => data.value),
                        backgroundColor: "rgba(75,192,192,0.6)",
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                  }}
                />
              </s.ChartContainer>
            </s.ChartContainerWrapper>
            <s.LowerContainersWrapper>
              <s.DataContainerWrapper>
                <s.DataContainer>
                  <s.NewPostsContainer>
                    <s.SectionTitle>New Posts</s.SectionTitle>
                    <s.PostList>
                      {newPosts.map((post) => (
                        <s.PostItem key={post.id}>
                          <s.PostTitle>{post.title}</s.PostTitle>
                          <s.PostAuthor>by {post.author}</s.PostAuthor>
                        </s.PostItem>
                      ))}
                    </s.PostList>
                  </s.NewPostsContainer>
                </s.DataContainer>
              </s.DataContainerWrapper>
              <s.FacultyCountsContainerWrapper>
                <s.FacultyCountsContainer>
                  <s.SectionTitle>Faculty Counts</s.SectionTitle>
                  <s.FacultyList>
                    {facultyCounts.map((faculty, index) => (
                      <s.FacultyItem key={index}>
                        <s.FacultyName>{faculty.faculty}</s.FacultyName>
                        <s.FacultyCount>{faculty.count}</s.FacultyCount>
                      </s.FacultyItem>
                    ))}
                  </s.FacultyList>
                </s.FacultyCountsContainer>
              </s.FacultyCountsContainerWrapper>
            </s.LowerContainersWrapper>
          </s.DashboardContainer>
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Coordinator_Dashboard;
