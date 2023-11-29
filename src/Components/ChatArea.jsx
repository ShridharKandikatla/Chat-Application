import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Send } from '@mui/icons-material';
import MessageOthers from './MessageOthers';
import MessageSelf from './MessageSelf';
import './myStyles.css';
import { useSelector } from 'react-redux';

const ChatArea = () => {
  const [conversations] = useState([
    {
      name: 'Shree',
      lastMessage: 'Hello',
      timeStamp: 'Today',
    },
    {
      name: 'Vishal',
      lastMessage: 'Good Morning',
      timeStamp: 'Today',
    },
    {
      name: 'Bhavin',
      lastMessage: 'Nice to meet you',
      timeStamp: 'Yesterday',
    },
  ]);
  const lightTheme = useSelector((state) => state.themeKey);

  return (
    <div className='chatArea-container'>
      <div className={'chatArea-header' + (lightTheme ? ' dark' : '')}>
        <p className='con-icon'>{conversations[0].name[0]}</p>
        <div className='header-text'>
          <p className={'con-title' + (lightTheme ? ' dark' : '')}>
            {conversations[0].name}
          </p>
          <p className={'con-timeStamp' + (lightTheme ? ' dark' : '')}>
            {conversations[0].timeStamp}
          </p>
        </div>
        <IconButton>
          <DeleteIcon className={'icon' + (lightTheme ? ' dark' : '')} />
        </IconButton>
      </div>
      <div className={'message-container' + (lightTheme ? ' dark' : '')}>
        <MessageSelf />
        <MessageOthers />
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
      </div>
      <div className={'text-input-area' + (lightTheme ? ' dark' : '')}>
        <input
          placeholder='Type a message'
          className={'search-box' + (lightTheme ? ' dark' : '')}
        />
        <IconButton>
          <Send className={'icon' + (lightTheme ? ' dark' : '')} />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatArea;
