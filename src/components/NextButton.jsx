import React from 'react';
import { useQuiz } from '../context/QuizContext';

const NextButton = () => {
  const { dispatch, numOfQuestions, index } = useQuiz();
  let actionType = 'nextQuestion';

  if (index === numOfQuestions - 1) actionType = 'finish';

  return (
    <button className='btn btn-ui' onClick={() => dispatch({ type: actionType })}>
      {actionType === 'nextQuestion' ? 'Next' : 'Finish'}
    </button>
  );
};

export default NextButton;
