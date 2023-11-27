import React from 'react';
import logo from '../Images/live-chat.png';
import './mystyles.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
        <img src={logo} alt="logo" className='welcome-logo' />
        <p>Live Chat</p>
    </div>
  );
}

export default Welcome;
