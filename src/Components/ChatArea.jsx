import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Send } from '@mui/icons-material';
import MessageOthers from './MessageOthers';
import MessageSelf from './MessageSelf';
import './myStyles.css';

const ChatArea = ({ conversations }) => {
  return (
    <div className='chatArea-container'>
      <div className='chatArea-header'>
        <p className='con-icon'>{conversations[0].name[0]}</p>
        <div className='header-text'>
          <p className='con-title'>{conversations[0].name}</p>
          <p className='con-timeStamp'>{conversations[0].timeStamp}</p>
        </div>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
      <div className='message-container'>
        <MessageSelf />
        <MessageOthers />
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
      </div>
      <div className='text-input-area'>
        <input placeholder='Type a message' className='search-box' />
        <IconButton>
          <Send />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatArea;
