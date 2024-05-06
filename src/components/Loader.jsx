import React from 'react';
import animation from '../../Animation - 1714999936586.json';
import Lottie from 'lottie-react';

const Loader = () => {
  return (
    <div className='loader-container'>
      {/* <div className='loader'></div> */}
      <span className='animation-wrapper'>
        <Lottie animationData={animation} />
      </span>
    </div>
  );
};

export default Loader;
