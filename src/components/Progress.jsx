import React from 'react';

const Progress = ({ numOfQuestions, index, maxPossiblePoint, points }) => {
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
