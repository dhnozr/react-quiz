import { useEffect, useReducer, useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';

const initialState = {
  questions: [],
  // loading, ready,finished,error gibi durumlari yonetecegim
  status: 'loading',
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
      default:
        break;
    }
  };
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  console.log(questions);

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
        </Main>
      </div>
    </>
  );
}

export default App;
