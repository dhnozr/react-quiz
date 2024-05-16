import React from 'react';
import { useQuiz } from '../context/QuizContext';

const Question = () => {
  const { questions, answer, dispatch, index } = useQuiz();
  const question = questions[index];
  const hasAnswered = answer !== null;
  return (
    <div className='options'>
      <h4>{question.question}</h4>
      {question.options.map((option, index) => (
        <button
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'answer', payload: index })}
          key={index}
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered ? (index === question.correctOption ? 'correct' : 'wrong') : ''
          } `}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Question;
