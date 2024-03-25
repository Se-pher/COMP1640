import React, { useState } from "react";
import * as s from "../../../Style/CoordinatorArticles";
import LogoImage from "../../../Image/web.png";
import AdminAvatar from "../../../Image/facebook.png";
import Navbar from "../../Navbar";
import CoordinatorArticleCard from './CoordinatorArticleCard';
import { articles } from "../../data";

const Coordinator_Articles = () => {
  const [selectedItem, setSelectedItem] = useState("Articles");
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          <s.ArticlesContainer>
            <s.ArticleGrid>
              {currentArticles.map((article) => (
                <CoordinatorArticleCard key={article.id} article={article} />
              ))}
            </s.ArticleGrid>
            <s.Pagination>
              {Array.from(
                { length: Math.ceil(articles.length / articlesPerPage) },
                (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    disabled={currentPage === i + 1}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </s.Pagination>
          </s.ArticlesContainer>
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Coordinator_Articles;
