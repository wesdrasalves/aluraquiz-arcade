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

    @media(max-width: 1200px) {
        display: none;
    }
  
`;

const Control = styled.div`
    width: 200px;
    height: 100px;
    background-image: url(${imgControl});
    background-size:contain;
    background-repeat: no-repeat;
    margin-bottom:80px;
    opacity:20%;
    
`;

const Game = () => (
  <>
    <AreaGame>
      <Control />
      <EnemiesGroup />
      <Player />
    </AreaGame>

  </>
);

export default Game;
