/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';
import animationLoading from '../src/lotties/loading-animation.json';
import animationCorrect from '../src/lotties/correct-animation.json';
import animationError from '../src/lotties/error-animation.json';
import atariBG from '../src/imgs/atari2600.png';

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

function LoadingWidget() {
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

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
  const [option, setOption] = useState(-1);
  const [resultQuestion, setResult] = useState(questionStates.AGUARNDANDO);

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      {resultQuestion === questionStates.SUCESSO && <AnimationSucesso /> }
      {resultQuestion === questionStates.ERRO && <AnimationErro /> }
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

        <form
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();

            if (question.answer === (option + 1)) {
              setResult(questionStates.SUCESSO);
            } else {
              setResult(questionStates.ERRO);
            }
            setTimeout(() => {
              setResult(questionStates.AGUARNDANDO);
              setOption(-1);
              onSubmit();
            }, 4000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setOption(alternativeIndex)}
                  checked={option === alternativeIndex}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit">
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 5000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div>Você acertou X questões, parabéns!</div>}
      </QuizContainer>
    </QuizBackground>
  );
}
