import Mountain from "../Image/Mountains.jpg";
import * as s from "../Style/Landing";
import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import axios from 'axios';

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);
  return (
    <s.Container>
      <s.Header>
        <s.Image src={Mountain} alt="" />
        <s.TextContainer>
          <h1>Welcome to My Blog</h1>
          <p>Explore the Latest Articles</p>
          <button>Explore</button>
        </s.TextContainer>
      </s.Header>
      <s.Section>
        <s.Title>Articles</s.Title>
        <s.ArticleGrid>
        {articles.map(article => (
        <ArticleCard key={article._id} article={article} />
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
        <s.Sidebar>
          <s.SidebarImageContainer>
            <s.SidebarImage src={Mountain} alt="Sidebar Image" />
            <s.ArticleCount>
              Currently {articles.length} Articles
            </s.ArticleCount>
          </s.SidebarImageContainer>
        </s.Sidebar>
      </s.Section>
      <s.Footer>
        <div>
          <s.FooterIcon src="icon-url.jpg" alt="Website Icon" />
          <s.FooterText>
            <s.FooterLink href="#">Our Mission</s.FooterLink>
            <s.FooterLink href="#">About Us</s.FooterLink>
          </s.FooterText>
        </div>
        <p>&copy; 2024 Your Website. All rights reserved.</p>
      </s.Footer>
    </s.Container>
  );
};

export default LandingPage;
