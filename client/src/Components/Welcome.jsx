import React from 'react';
import logo from '../Images/live-chat.png';
import { useSelector } from 'react-redux';

const Welcome = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem('userData'));
  return (
    <div className={'welcome-container' + (lightTheme ? ' dark' : '')}>
      <img src={logo} alt='logo' className='welcome-logo' />
      <p>
        Hi <b>{userData.data.name}</b>, Welcome to Live Chat{' '}
      </p>
    </div>
  );
};

export default Welcome;
