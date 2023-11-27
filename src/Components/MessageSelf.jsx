import React from 'react';

const MessageSelf = () => {
  var props2 = {
    message: 'This is a 2nd message',
    timestamp: '12:00',
  };
  return (
    <div className='self-message-container'>
      <div className='messageBox'>
        <p>{props2.message}</p>
        {/* <p className='self-timestamp'>{props2.timestamp}</p> */}
      </div>
    </div>
  );
};

export default MessageSelf;
