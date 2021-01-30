import React from 'react';
import styled from 'styled-components';
import EnemiesGroup from '../EnemiesGroup';
import Player from '../Player';
import imgControl from '../../imgs/arrow-control.png';

const AreaGame = styled.div`
    height:100%;
    width: 980px;
    position: fixed;
    right: 0px;
    display:flex;
    justify-content:flex-end;
    align-items: flex-end;

    @media(max-width: 1450px) {
        display: none;
    }
  
`;

const Control = styled.div`
    width: 150px;
    height: 200px;
    background-image: url(${imgControl});
    background-size:contain;
    background-repeat: no-repeat;
    margin-bottom:70px;
    margin-right:30px;
    opacity:70%;
    color:#FFF;
    display: flex;
    align-items:flex-end;
    text-align:center;
`;

const Title = styled.h2`
  position:fixed;
  top:10px;
  right: 160px;
  font-size:16px;
  font-family: 'Press Start 2P', cursive;
`;

const Game = () => (
  <>
    <AreaGame>
      <Title>Um exempo de um dos jogos clássicos do Atari</Title>
      <Control>
        Use o direcional do teclado para mover o personagem e seta para cima para atirar.
      </Control>
      <EnemiesGroup />
      <Player />
    </AreaGame>

  </>
);

export default Game;
