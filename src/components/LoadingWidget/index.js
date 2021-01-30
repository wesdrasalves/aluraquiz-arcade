import React from 'react';
import Lottie from 'react-lottie';
import animationLoading from '../../lotties/loading-animation.json';
import defaultOptions from '../../lotties/lottieOptions';
import Widget from '../Widget';

export default function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Voltando no tempo.
      </Widget.Header>

      <Widget.Content>
        <Lottie
          options={defaultOptions(animationLoading)}
          height={100}
          width={200}
        />
      </Widget.Content>
    </Widget>
  );
}
