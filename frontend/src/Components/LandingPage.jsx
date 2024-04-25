import Mountain from "../Image/Mountains.jpg";
import Beach from "../Image/image.jfif"
import * as s from "../Style/Landing";
import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import axios from 'axios';
import { Typewriter, Cursor } from 'react-simple-typewriter';

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get('/api/articlesFaculty', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
  
    fetchArticles();
  }, []);
  
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

  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  return (
    <s.Container>
      <s.Header>
        <s.Image src={Mountain} alt="" />
        <s.WelcomeText>Welcome to our website</s.WelcomeText>
        <s.TypewriterContainer>
          <s.HighlightText>
            <Typewriter
              words={[
                " This is an interesting website",
                " Here are many good articles",
                " These are handsome coders",
              ]}
              loop={0}
              cursor={false}
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
              onType={(text, i) => <s.Highlight key={i}>{text}</s.Highlight>}
            />
            <span style={{ color: "red" }}>
              <Cursor cursorStyle="|" />
            </span>
          </s.HighlightText>
        </s.TypewriterContainer>
      </s.Header>
      <s.Section>
        <s.Title>Articles</s.Title>
        <s.ArticleGrid>
          {currentArticles.map((article) => (
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
          <s.SloganContainer>
            <s.SloganImage src={Beach} alt="Slogan Image" />
            <s.Slogan>this is the best website</s.Slogan>
          </s.SloganContainer>
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