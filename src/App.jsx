import { useEffect, useReducer, useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';

const initialState = {
  questions: [],
  // loading, ready,finished,error for handling state
  status: 'loading',
  // index for tracking which question !start with the first question
  index: 0,
  // user answer
  answer: null,
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
        return { ...state, answer: action.payload };
        break;
      case 'nextQuestion':
        return { ...state, index: state.index + 1, answer: null };
      default:
        break;
    }
  };
  const [{ questions, status, index, answer }, dispatch] = useReducer(reducer, initialState);

  // take how many questions in the array
  const numOfQuestions = questions.length;

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
              <Question question={questions[index]} answer={answer} dispatch={dispatch} />
              <NextButton dispatch={dispatch} />
            </>
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
