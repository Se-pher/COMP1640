import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const Header = styled.header`
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: cover;
  @media (max-width: 768px) {
    width:100%;
  }
`;

export const Highlight = styled.span`
`;

export const TypewriterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 23%;
  transform: translate(-50%, -50%);
  text-align: left;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media only screen and (max-width: 768px) {
    left: 42%;
    transform: translateX(-50%);
    text-align: left;
    top: 62%;
    font-size: 20px;
    padding: 0px;
  }
`;

export const WelcomeText = styled.span`
  position: absolute;
  top: 43%;
  left: 18%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media only screen and (max-width: 768px) {
    top: 57%;
    left: 36%;
    transform: translate(-50%, -50%);
    font-size: 24px;
  }
`;

export const HighlightText = styled.span`
  font-size: 2rem;
  display: inline-block;
  color: #ff6347;
  animation: colorChange 15s infinite;

  @keyframes colorChange {
    100% {color: #00F260;}
    100% {color: #ff6347;}
    100% {color: #0575E6;}
  }
  @media only screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

export const Section = styled.section`
  padding: 2rem;
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2rem;
  margin-bottom: 2rem;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ArticleCard = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

export const ArticleImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

export const ArticleInfo = styled.div`
  padding: 1rem;
  padding-top: 0px;
`;

export const ArticleDate = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

export const ArticleTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;

  a {
    text-decoration: none;
    color: #333;

    &:visited {
      color: #333;
    }
  }
`;

export const ArticleDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
`;

export const ArticleAuthor = styled.div`
  display: flex;
  align-items: center;
`;

export const AuthorAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 3rem;

  button {
    background-color: #f2f2f2;
    border: none;
    color: #333;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1rem;
    margin: 0 0.25rem;
    cursor: pointer;
    border-radius: 4px;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

export const Sidebar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SidebarImageContainer = styled.div`
  position: relative;
`;

export const SidebarImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: 530px;
  @media only screen and (max-width: 768px) {
    height: auto;
  }
`;

export const SloganContainer = styled.div`
  position: relative;
  margin-left: 2rem;
`;

export const SloganImage = styled.img`
  width: 100%;
  max-width: 800px;
  height: auto;
  @media only screen and (max-width: 768px) {
    height: auto;
  }
`;

export const Slogan = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const ArticleCount = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
`;

export const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const FooterIcon = styled.img`
  width: 32px;
  height: 32px;
`;

export const FooterText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin-bottom: 0.5rem;
`;
