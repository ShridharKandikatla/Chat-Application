import React from 'react';
import { useSelector } from 'react-redux';

const MessageOthers = ({ props }) => {
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div className='other-message-container'>
      <div className='conversation-container'>
        <p className='con-icon'>{props.sender.name[0].toUpperCase()}</p>
        <div className={'other-text-content' + (lightTheme ? ' green' : '')}>
          <p className='con-title'>{props.sender.name}</p>
          <p className='con-lastMessage'>{props.content}</p>
          {/* <p className='self-timestamp'>{props1.timestamp}</p> */}
        </div>
      </div>
    </div>
  );
};

export default MessageOthers;
