import React from 'react';

const MessageOthers = () => {
  var props1 = {
    name: 'Vishal',
    message: 'This is a message',
    timestamp: '12:00',
  };
  return (
    <div className='other-message-container'>
      <div className='conversation-container'>
        <p className='con-icon'>{props1.name[0]}</p>
        <div className='other-text-content'>
          <p className='con-title'>{props1.name}</p>
          <p className='con-lastMessage'>{props1.message}</p>
          {/* <p className='self-timestamp'>{props1.timestamp}</p> */}
        </div>
      </div>
    </div>
  );
};

export default MessageOthers;
