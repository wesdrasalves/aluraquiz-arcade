import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import BackLinkArrow from '../BackLinkArrow';
import animationLoading from '../../lotties/contruction.json';
import defaultOptions from '../../lotties/lottieOptions';

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    width:100%;
    height:100vh;
`;

const Title = styled.h1`
    color: #000;
    font-size: 22px;
`;

const QuizConstrucao = () => (
  <Content>
    <Title>
      <BackLinkArrow href="/" color="black" width="60px" />
      <span>Este Quiz ainda está em manutenção, tente mais tarde.</span>
    </Title>
    <Lottie
      options={defaultOptions(animationLoading)}
      height={400}
      width={400}
    />

  </Content>
);

export default QuizConstrucao;
