import React from "react";
import Mountain from "../Image/Mountains.jpg";
import * as s from "../Style/Landing";

const LandingPage = () => {
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
      </s.Section>
    </s.Container>
  );
};

export default LandingPage;