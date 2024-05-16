import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Timer from './components/Timer';
import { QuizContextProvider, useQuiz } from './context/QuizContext';
import Quiz from './components/Quiz';

function App() {
  return (
    <>
      <QuizContextProvider>
        <Quiz />
      </QuizContextProvider>
    </>
  );
}

export default App;
