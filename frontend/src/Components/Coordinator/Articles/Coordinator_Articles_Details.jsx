import React, { useState } from "react";
import * as s from "../../../Style/Coordinator/Coordinator_A_Detail";
import Sidebar from "../Sidebar";
import Navbar from "../../Navbar";
import { articles } from "../../data";
import { useParams } from "react-router-dom";
import FeedbackPopup from "./FeedbackPopup";

const Coordinator_Articles_Details = () => {
  const [selectedItem, setSelectedItem] = useState("Articles");
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsPopupOpen(true);
  };

  const handleSubmitFeedback = (feedback) => {
    console.log(`Feedback for ${selectedOption}: ${feedback}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
      <Sidebar selectedItem={selectedItem} handleItemClick={handleItemClick} />
        <s.Main>
          <s.ArticlesContainer>
            <s.SquareContainer>
              <s.ActionsContainer>
                <s.ApprovalDropdown>
                  <s.DropdownButton onClick={toggleDropdown}>
                    Choose option <s.DropdownIcon />
                  </s.DropdownButton>
                  {isDropdownOpen && (
                    <s.DropdownMenu>
                      <s.DropdownOption
                        onClick={() => handleOptionSelect("Approved")}
                      >
                        Approved
                      </s.DropdownOption>
                      <s.DropdownOption
                        onClick={() => handleOptionSelect("Rejected")}
                      >
                        Rejected
                      </s.DropdownOption>
                    </s.DropdownMenu>
                  )}
                </s.ApprovalDropdown>
              </s.ActionsContainer>
              <FeedbackPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSubmit={handleSubmitFeedback}
              />
              <s.ArticleHeader>
                <s.ArticleTitle>{article.title}</s.ArticleTitle>
              </s.ArticleHeader>
              <s.ArticleContent>
                <s.ArticleDetails>
                  <s.ArticleDescription>
                    {article.description}
                  </s.ArticleDescription>
                  <s.Divider />
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
