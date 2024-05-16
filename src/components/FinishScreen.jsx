import React from 'react';
import { useQuiz } from '../context/QuizContext';

const FinishScreen = () => {
  const { points, maxPossiblePoint, dispatch, maxPoint } = useQuiz();
  const percentage = (points / maxPossiblePoint) * 100;
  return (
    <>
      <p className='result'>
        You scored {points} out of {maxPossiblePoint}({Math.ceil(percentage)}%)
      </p>
      <p className='highscore'>High score is {maxPoint}</p>
      <button onClick={() => dispatch({ type: 'restart' })} className='btn btn-ui'>
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
