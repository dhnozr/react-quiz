import React from 'react';
import { useQuiz } from '../context/QuizContext';
import FinishScreen from './FinishScreen';
import StartScreen from './StartScreen';
import Error from './Error';
import Loader from './Loader';
import Header from './Header';
import Main from './Main';
import Progress from './Progress';
import Question from './Question';
import Timer from './Timer';
import NextButton from './NextButton';

function Quiz() {
  const { status } = useQuiz();
  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <Timer />
            <NextButton />
          </>
        )}
        {status === 'finished' && <FinishScreen />}
      </Main>
    </div>
  );
}

export default Quiz;
