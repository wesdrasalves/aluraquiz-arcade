import React from 'react';
import Lottie from 'react-lottie';
import Widget from '../Widget';
import Link from '../Link';
import defaultOptions from '../../lotties/lottieOptions';
import animationLoading from '../../lotties/loading-animation.json';

// eslint-disable-next-line react/prop-types
const QuizFriends = ({ data }) => (
  <ul>
    {// eslint-disable-next-line react/prop-types
    data.map((linkExterno) => (
      <li key={linkExterno.UserName}>
        <Widget.Topic
          as={Link}
          href={`/quiz/${linkExterno.Project}___${linkExterno.UserName}`}
        >
          {`${linkExterno.UserName}/${linkExterno.Project}`}
        </Widget.Topic>
      </li>
    ))
}
  </ul>
);

// eslint-disable-next-line react/prop-types
const QuizRepository = ({ external }) => (
  <>
    {external.length === 0 && (
      <Lottie
        options={defaultOptions(animationLoading)}
        height={100}
        width={200}
      />
    )}
    {external.length > 0 && <QuizFriends data={external} />}
  </>
);

export default QuizRepository;
