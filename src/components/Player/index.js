import React, { useEffect, useState } from 'react';
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
    @keyframes movimentoTiro{
        from {top: -10px};
        to {top: -1000px}
    }

    width:5px;
    height: 20px;
    background: #FFF;
    position: absolute;
    left: ${(props) => props.position + 20}px;
    animation: movimentoTiro 4s infinite;
`;

const Player = () => {
  const [position, setPosition] = useState(0);
  const [renderTiro, setRenderTiro] = useState(false);
  const ArrowRight = useKeyPress('ArrowRight');
  const ArrowLeft = useKeyPress('ArrowLeft');
  const Space = useKeyPress('ArrowUp');
  const [tiro, setElementTiro] = useState(undefined);

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
    if (Space && !renderTiro) {
      setRenderTiro(true);

      setTimeout(() => {
        setRenderTiro(false);
        setElementTiro(undefined);
      }, 2000);
    }
  }, [Space]);

  useEffect(() => {
    if (renderTiro && !tiro) {
      setElementTiro(<Tiro position={position} />);
    }
  }, [renderTiro]);

  return (
    <AreaPlayer>
      {tiro}
      <PlayerElement position={position} />
    </AreaPlayer>
  );
};

export default Player;
