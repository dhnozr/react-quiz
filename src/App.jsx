import { useEffect, useReducer, useState } from 'react';

const initialState = {
  questions: [],
  // loading, ready,finished gibi durumlari yonetecegim
  status: 'loading',
};

function App() {
  // reducer function
  const reducer = (state, action) => {
    switch (action.type) {
      case 'dataReceived':
        return { ...state, questions: action.payload };
        break;

      default:
        break;
    }
  };
  const [{ questions }, dispatch] = useReducer(reducer, initialState);

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
  return <></>;
}

export default App;
