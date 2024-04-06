import React from 'react';
import styled from 'styled-components';
import error404Image from '../Image/404.jpg';

const Error404Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Error404Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const Error404 = () => {
  return (
    <Error404Container>
      <Error404Image src={error404Image} alt="404 Not Found" />
    </Error404Container>
  );
};

export default Error404;