import React, { useState, useEffect } from "react";
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
import axios from "axios";
import CoordinatorArticleCard from "../Articles/CoordinatorArticleCard";

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
  const [articles, setArticles] = useState([]);
  const [facultyName, setFacultyName] = useState("");
  const [userName, setUserName] = useState("");

  const [chartData] = useState([
    { day: "Monday", value: 10 },
    { day: "Tuesday", value: 15 },
    { day: "Wednesday", value: 12 },
    { day: "Thursday", value: 18 },
    { day: "Friday", value: 20 },
    { day: "Saturday", value: 25 },
    { day: "Sunday", value: 22 },
  ]);

  const [viewMode, setViewMode] = useState("week");

  const handleChangeViewMode = (mode) => {
    setViewMode(mode);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFacultyName(response.data.facultyName);
        fetchArticles(response.data.facultyName);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  });

  const fetchArticles = async () => {
    try {
      const response = await axios.get("/api/articles", {
        params: { facultyName, limit: 3, sort: "createdAt" },
      });
      const filteredArticles = response.data.filter(
        (article) => article.facultyName === facultyName
      );
      setArticles(filteredArticles.reverse());
    } catch (error) {
      console.error("Error fetching articles:", error.response.data.message);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      fetchUsername(token);
    }
  }, []);

  const fetchUsername = async (token) => {
    try {
      const response = await axios.get("/api/decode-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserName(response.data.username);
    } catch (error) {
      console.error("Error fetching username:", error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  };

  return (
    <s.Container>
      <Navbar />
      <s.MainContent>
        <Sidebar
          selectedItem={selectedItem}
          handleItemClick={handleItemClick}
          userName={userName}
          handleLogout={handleLogout}
        />
        <s.Main>
          <s.DashboardContainer>
            <s.ChartContainerWrapper>
              <s.ChartContainer>
                <Bar
                  data={{
                    labels:
                      viewMode === "week"
                        ? chartData.map((data) => data.day)
                        : viewMode === "month"
                        ? generateMonthlyData().map((data) => data.day)
                        : generateYearlyData().map((data) => data.month),
                    datasets: [
                      {
                        label: "Number of Posts",
                        data:
                          viewMode === "week"
                            ? chartData.map((data) => data.value)
                            : viewMode === "month"
                            ? generateMonthlyData().map((data) => data.value)
                            : generateYearlyData().map((data) => data.value),
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
                <button onClick={() => handleChangeViewMode("week")}>
                  Week
                </button>
                <button onClick={() => handleChangeViewMode("month")}>
                  Month
                </button>
                <button onClick={() => handleChangeViewMode("year")}>
                  Year
                </button>
              </s.ViewModeButtons>
            </s.ChartContainerWrapper>
            <s.LowerContainersWrapper>
              <s.DataContainerWrapper>
                <s.DataContainer>
                  <s.NewPostsContainer>
                    <s.SectionTitle>New Articles</s.SectionTitle>
                    <s.ArticleGrid>
                      {articles.slice(0, 3).map((article) => (
                        <CoordinatorArticleCard
                          key={article._id}
                          article={article}
                        />
                      ))}
                    </s.ArticleGrid>
                  </s.NewPostsContainer>
                </s.DataContainer>
              </s.DataContainerWrapper>
            </s.LowerContainersWrapper>
          </s.DashboardContainer>
        </s.Main>
      </s.MainContent>
    </s.Container>
  );

  function generateMonthlyData() {
    const monthData = [];
    for (let i = 1; i <= 30; i++) {
      monthData.push({ day: `Day ${i}`, value: Math.floor(Math.random() * 50) });
    }
    return monthData;
  }

  function generateYearlyData() {
    const yearlyData = [];
    for (let i = 1; i <= 12; i++) {
      yearlyData.push({ month: `Month ${i}`, value: Math.floor(Math.random() * 500) });
    }
    return yearlyData;
  }
};

export default Coordinator_Dashboard;