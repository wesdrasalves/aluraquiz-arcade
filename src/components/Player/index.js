import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import imgEnemie from '../../imgs/player.png';
import useKeyPress from '../../utils/domEvents';

const AreaPlayer = styled.div`
    width:800px;
    position:fixed;
    right:0px;
    bottom:0px;
    margin-right:150px;
    height: 50px;
`;

const PlayerElement = styled.div`
    width:50px;
    height:36.5px;
    background-image: url(${imgEnemie});
    background-position: initial;
    background-size: cover;
    margin-left: ${(props) => props.position}px;
`;

const Tiro = styled.div`
    top: ${(props) => props.positionTiro}px;
    width:5px;
    height: 20px;
    background: #FFF;
    position: absolute;
    left: ${(props) => props.position + 20}px;
`;

const Player = () => {
  const postionInitialTiro = -1100;
  const [position, setPosition] = useState(0);
  const ArrowRight = useKeyPress('ArrowRight');
  const ArrowLeft = useKeyPress('ArrowLeft');
  const ArrowUp = useKeyPress('ArrowUp');
  const [positionTiro, setPositionTiro] = useState(postionInitialTiro);
  const [startPositionTiro, setStartPositionTiro] = useState(postionInitialTiro);

  const projetil = useRef(null);

  useEffect(() => {
    if (position > 0) {
      setPosition(position - 10);
    }
  }, [ArrowLeft]);

  useEffect(() => {
    if (position < 800) {
      setPosition(position + 10);
    }
  }, [ArrowRight]);

  useEffect(() => {
    if (ArrowUp && positionTiro <= postionInitialTiro) {
      setPositionTiro(-10);
      setStartPositionTiro(position);
    }
  }, [ArrowUp]);

  useEffect(() => {
    if (positionTiro > postionInitialTiro) {
      setTimeout(() => {
        setPositionTiro(positionTiro - 10);
      }, 40);
    }
  }, [positionTiro]);

  return (
    <AreaPlayer>
      <Tiro position={startPositionTiro} positionTiro={positionTiro} ref={projetil} />
      <PlayerElement position={position} />
    </AreaPlayer>
  );
};

export default Player;
