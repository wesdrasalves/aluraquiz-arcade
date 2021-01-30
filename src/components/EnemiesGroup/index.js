import React, { useState } from 'react';
import styled from 'styled-components';
import Enemie from '../Enemie';

const GroupEnemies = styled.div`
    @keyframes movimento {
    0%   {right: -50px}
    50%  {right: -80px}
    100%  {right: -50px}
    }

    
    animation-delay: 1s;
    animation: movimento 2s infinite;
    width:800px;
    position:fixed;
    right:0px;
    top:80px;
    margin-right:200px;
    height: 200px;
`;

const GroupRow = styled.div`
    display: flex;
    justify-content: flex-end;
    width:800px;
`;

const EnemiesGroup = () => {
  const [total] = useState(10);

  const generatorEnemies = (totalEnemies) => {
    const groups = [];

    for (let column = 0; column <= 3; column += 1) {
      const enemies = [];
      for (let i = 0; i <= totalEnemies; i += 1) {
        enemies.push(<Enemie type={0} id={`inemie-${i}`} />);
      }

      groups.push(<GroupRow key={column}>{enemies}</GroupRow>);
    }

    return groups;
  };

  return (
    <GroupEnemies>
      {generatorEnemies(total)}
    </GroupEnemies>
  );
};

export default EnemiesGroup;
