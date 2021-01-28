/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import Widget from '../Widget';
import Button from '../Button';
import atariBG from '../../imgs/atari2600.png';
import animationCorrect from '../../lotties/correct-animation.json';
import animationError from '../../lotties/error-animation.json';
import AternativesForm from '../AlternativesForm';

const defaultOptions = (animation) => ({
  loop: true,
  autoplay: true,
  animationData: animation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
});

const PanelAnimation = styled.div`
  width: 350px;
  height: 150px;
  position:absolute;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const AnimationSucesso = () => (
  <PanelAnimation>
    <Lottie
      options={defaultOptions(animationCorrect)}
      height={100}
      width={200}
    />
  </PanelAnimation>
);

const AnimationErro = () => (
  <PanelAnimation>
    <Lottie
      options={defaultOptions(animationError)}
      height={100}
      width={200}
    />
  </PanelAnimation>
);

const questionStates = {
  AGUARNDANDO: 'AGUARDANDO',
  SUCESSO: 'SUCESSO',
  ERRO: 'ERRO',
};

export default function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  onSetResult,
}) {
  const questionId = `question__${questionIndex}`;
  const [option, setOption] = useState(undefined);
  const [statusResultQuestion, setStatusResult] = useState(questionStates.AGUARNDANDO);
  const [questionSubmit, setQuestionSubmit] = useState(undefined);

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      {statusResultQuestion === questionStates.SUCESSO && <AnimationSucesso /> }
      {statusResultQuestion === questionStates.ERRO && <AnimationErro /> }
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={atariBG}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();

            setQuestionSubmit(option);

            if (question.answer === (option + 1)) {
              onSetResult(true);
              setStatusResult(questionStates.SUCESSO);
            } else {
              setStatusResult(questionStates.ERRO);
              onSetResult(false);
            }
            setTimeout(() => {
              setStatusResult(questionStates.AGUARNDANDO);
              setOption(undefined);
              setQuestionSubmit(undefined);
              onSubmit();
            }, 2000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const isSelected = option === alternativeIndex;
            const isSubmitQuestion = alternativeIndex === questionSubmit;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isSubmitQuestion && statusResultQuestion}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                    // eslint-disable-next-line react/no-array-index-key
                  key={`opt_${alternativeIndex}`}
                  onChange={() => setOption(alternativeIndex)}
                  checked={isSelected}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={option === undefined || questionSubmit !== undefined}>
            Confirmar
          </Button>
        </AternativesForm>
      </Widget.Content>
    </Widget>
  );
}
