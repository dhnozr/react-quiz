import React from 'react';
import logo from '../assets/react.svg';

const Header = () => {
  return (
    <header className='app-header'>
      <img className='logo' src={logo} alt='react-logo' />
      <h1>The React Quiz</h1>
    </header>
  );
};

export default Header;
