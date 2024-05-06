import { useEffect, useReducer, useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';

const initialState = {
  questions: [],
  // loading, ready,finished,error for handling state
  status: 'loading',
  // index for tracking which question !start with the first question
  index: 0,
  // user answer
  answer: null,
  // user points
  points: 0,
  // keep max score of user
  maxPoint: 0,
};

function App() {
  // reducer function
  const reducer = (state, action) => {
    switch (action.type) {
      case 'dataReceived':
        return { ...state, questions: action.payload, status: 'ready' };
        break;
      case 'dataFailed':
        return { ...state, status: 'error' };
        break;
      case 'start':
        return { ...state, status: 'active' };
        break;
      case 'answer':
        const correctAnswer = state.questions[state.index].correctOption;

        return {
          ...state,
          answer: action.payload,
          points: action.payload === correctAnswer ? state.points + state.questions[state.index].points : state.points,
        };
        break;
      case 'nextQuestion':
        return { ...state, index: state.index + 1, answer: null };
        break;
      case 'finish':
        return {
          ...state,
          status: 'finished',
          maxPoint: state.points > state.maxPoint ? state.points : state.maxPoint,
        };
        break;
      case 'restart':
        return { ...initialState, questions: state.questions, status: 'ready', maxPoint: state.maxPoint };
      default:
        break;
    }
  };
  const [{ questions, status, index, answer, points, maxPoint }, dispatch] = useReducer(reducer, initialState);

  // take how many questions in the array
  const numOfQuestions = questions.length;
  // calc maxPoints in the game
  const maxPossiblePoint = questions.reduce((acc, curr) => acc + curr.points, 0);

  // fetch questions
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch('/data.json');
        const res = await data.json();
        dispatch({ type: 'dataReceived', payload: res.questions });
      } catch (error) {
        dispatch({ type: 'dataFailed' });
      }
    };

    getData();
  }, []);
  return (
    <>
      <div className='app'>
        <Header />
        <Main>
          {status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
          {status === 'ready' && <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />}
          {status === 'active' && (
            <>
              <Progress
                numOfQuestions={numOfQuestions}
                index={index}
                maxPossiblePoint={maxPossiblePoint}
                points={points}
              />
              <Question question={questions[index]} answer={answer} dispatch={dispatch} />
              <NextButton dispatch={dispatch} numOfQuestions={numOfQuestions} index={index} />
            </>
          )}
          {status === 'finished' && (
            <FinishScreen point={points} maxPossiblePoint={maxPossiblePoint} dispatch={dispatch} maxPoint={maxPoint} />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
