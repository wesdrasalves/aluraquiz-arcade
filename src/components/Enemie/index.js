import React from 'react';
import styled from 'styled-components';
import imgEnemie from '../../imgs/enemie.png';

const Area = styled.div`
    width:50px;
    height:36.5px;
    background-image: url(${imgEnemie});
    background-position: ${(props) => props.typeEnemie}px;
    background-size: cover;
    margin: 10px;
`;

// eslint-disable-next-line react/prop-types
const Enemie = ({ id, type }) => {
  const typesEnemies = [0, 50];
  let localType = 0;

  if (type > typesEnemies.length || type < typesEnemies) {
    // eslint-disable-next-line prefer-destructuring
    localType = typesEnemies[0];
  } else {
    localType = typesEnemies[type];
  }

  return (
    <Area key={id} typeEnemie={localType} />
  );
};

export default Enemie;
