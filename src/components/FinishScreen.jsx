import React from 'react';

const FinishScreen = ({ point, maxPossiblePoint, dispatch, maxPoint }) => {
  const percentage = (point / maxPossiblePoint) * 100;
  return (
    <>
      <p className='result'>
        You scored {point} out of {maxPossiblePoint}({Math.ceil(percentage)}%)
      </p>
      <p className='highscore'>High score is {maxPoint}</p>
      <button onClick={() => dispatch({ type: 'restart' })} className='btn btn-ui'>
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
