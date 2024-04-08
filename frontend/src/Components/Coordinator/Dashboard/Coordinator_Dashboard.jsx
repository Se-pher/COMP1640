import React, { useState } from "react";
import * as s from "../../../Style/Coordinator/Dashboard";
import Navbar from "../../Navbar";
import { Bar } from "react-chartjs-2";
import Sidebar from "../Sidebar";
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

  const [chartData] = useState([
    { day: "Monday", value: 10 },
    { day: "Tuesday", value: 15 },
    { day: "Wednesday", value: 12 },
    { day: "Thursday", value: 18 },
    { day: "Friday", value: 20 },
    { day: "Saturday", value: 25 },
    { day: "Sunday", value: 22 },
  ]);

  const [newPosts] = useState([
    { id: 1, title: "Post 1", author: "John Doe" },
    { id: 2, title: "Post 2", author: "Jane Smith" },
    { id: 3, title: "Post 3", author: "Bob Johnson" },
  ]);
  
  const [facultyCounts] = useState([
    { faculty: "Faculty of Arts", count: 25 },
    { faculty: "Faculty of Science", count: 32 },
    { faculty: "Faculty of Engineering", count: 18 },
  ]);

  const generateMonthlyData = () => {
    const monthData = [];
    for (let i = 1; i <= 30; i++) {
      monthData.push({ day: `Day ${i}`, value: Math.floor(Math.random() * 50) });
    }
    return monthData;
  };

  const generateYearlyData = () => {
    const yearlyData = [];
    for (let i = 1; i <= 12; i++) {
      yearlyData.push({ month: `Month ${i}`, value: Math.floor(Math.random() * 500) });
    }
    return yearlyData;
  };

  const [viewMode, setViewMode] = useState("week");

  const handleChangeViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <s.Container>
      <Navbar />
      <s.MainContent>
        <Sidebar selectedItem={selectedItem} handleItemClick={handleItemClick} />
        <s.Main>
          <s.DashboardContainer>
          <s.ChartContainerWrapper>
              <s.ChartContainer>
                <Bar
                  data={{
                    labels: viewMode === "week" ? chartData.map((data) => data.day) : viewMode === "month" ? generateMonthlyData().map((data) => data.day) : generateYearlyData().map((data) => data.month),
                    datasets: [
                      {
                        label: "Number of Posts",
                        data: viewMode === "week" ? chartData.map((data) => data.value) : viewMode === "month" ? generateMonthlyData().map((data) => data.value) : generateYearlyData().map((data) => data.value),
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
              <s.ViewModeButtons>
                    <button onClick={() => handleChangeViewMode("week")}>Week</button>
                    <button onClick={() => handleChangeViewMode("month")}>Month</button>
                    <button onClick={() => handleChangeViewMode("year")}>Year</button>
                </s.ViewModeButtons>
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
