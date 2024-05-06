import React from 'react';

const NextButton = ({ dispatch, numOfQuestions, index }) => {
  let actionType = 'nextQuestion';

  if (index === numOfQuestions - 1) actionType = 'finish';

  return (
    <button className='btn btn-ui' onClick={() => dispatch({ type: actionType })}>
      {actionType === 'nextQuestion' ? 'Next' : 'Finish'}
    </button>
  );
};

export default NextButton;
