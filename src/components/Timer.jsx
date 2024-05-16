import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';

const Timer = () => {
  const { secondsRemaining, dispatch } = useQuiz();
  const min = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className='timer'>
      {min < 10 && '0'}
      {min}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
};

export default Timer;
