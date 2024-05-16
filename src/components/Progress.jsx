import React from 'react';
import { useQuiz } from '../context/QuizContext';

const Progress = () => {
  const { numOfQuestions, index, maxPossiblePoint, points } = useQuiz();
  return (
    <header className='progress'>
      <progress value={index + 1} max={numOfQuestions} />
      <p>
        Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoint}
      </p>
    </header>
  );
};

export default Progress;
