import React from 'react';

const Question = ({ question, answer, dispatch }) => {
  console.log(question);
  const hasAnswered = answer !== null;
  return (
    <div className='options'>
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
