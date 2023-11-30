import React from 'react';
import logo from '../Images/live-chat.png';
import { useSelector } from 'react-redux';
import './mystyles.css';

const Welcome = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div className={'welcome-container' + (lightTheme ? ' dark' : '')}>
      <img src={logo} alt='logo' className='welcome-logo' />
      <p>Live Chat</p>
    </div>
  );
}

export default Welcome;
