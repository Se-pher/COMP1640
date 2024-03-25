import React, { useState } from "react";
import * as s from "../../../Style/Coordinator_A_Detail";
import LogoImage from "../../../Image/web.png";
import AdminAvatar from "../../../Image/facebook.png";
import Navbar from "../../Navbar";
import { articles } from "../../data";
import { useParams } from "react-router-dom";

const Coordinator_Articles_Details = () => {
  const [selectedItem, setSelectedItem] = useState("Articles");
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const { id } = useParams();
  const article = articles.find((article) => article.id === parseInt(id));

  if (!article) {
    return <div>Article not found</div>;
  }
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
            <s.SquareContainer>
              <s.ArticleHeader>
                <s.ArticleTitle>{article.title}</s.ArticleTitle>
              </s.ArticleHeader>
              <s.ArticleContent>
                <s.ArticleDetails>
                <s.ArticleDescription>
                    {article.description}
                  </s.ArticleDescription>
                  <s.ArticleMetadata>
                    <s.ArticleDate>{article.date}</s.ArticleDate>
                    <s.ArticleAuthor>
                      <s.AuthorAvatar
                        src={article.authorAvatar}
                        alt={article.author}
                      />
                      <span>{article.author}</span>
                    </s.ArticleAuthor>
                  </s.ArticleMetadata>
                </s.ArticleDetails>
                <s.ArticleImage src={article.imageUrl} alt={article.title} />
              </s.ArticleContent>
            </s.SquareContainer>
          </s.ArticlesContainer>
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Coordinator_Articles_Details;
