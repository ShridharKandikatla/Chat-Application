import React from 'react';
import { useSelector } from 'react-redux';

const MessageSelf = () => {
  var props2 = {
    message: 'This is a 2nd message',
    timestamp: '12:00',
  };
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div className='self-message-container'>
      <div className={'messageBox' + (lightTheme ? ' violet' : '')}>
        <p>{props2.message}</p>
        {/* <p className='self-timestamp'>{props2.timestamp}</p> */}
      </div>
    </div>
  );
};

export default MessageSelf;
