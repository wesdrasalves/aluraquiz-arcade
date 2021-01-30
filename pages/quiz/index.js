/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import LoadingWidget from '../../src/components/LoadingWidget';
import QuestionWidget from '../../src/components/QuestionWidget';

function ResultWidget({ result }) {
  return (
    <Widget>
      <Widget.Header>
        <h1>Tela de Resultado</h1>
      </Widget.Header>
      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {result.reduce((somatorioAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatorioAtual + 1;
            }

            return somatorioAtual;
          }, 0)}
          {' '}
          perguntas
        </p>
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
  const [results, setResult] = useState([]);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 5000);
  }, []);

  function handleSetResult(result) {
    setResult(results.concat([result]));
  }

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
            onSetResult={handleSetResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget result={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
