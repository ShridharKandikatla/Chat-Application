import React from 'react';
import { useSelector } from 'react-redux';

const MessageSelf = ({ props }) => {
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div className='self-message-container'>
      <div className={'messageBox' + (lightTheme ? ' violet' : '')}>
        <p>{props.content}</p>
      </div>
    </div>
  );
};

export default MessageSelf;
