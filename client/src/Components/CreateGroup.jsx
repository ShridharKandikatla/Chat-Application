import React, { useState } from 'react';
//import '../CSS/mystyles.css';
import { IconButton } from '@mui/material';
import { DoneOutlineRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  if (!userData) {
    console.log('no user');
    navigate('/login');
  }
  const makeGroup = () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + userData.data.token,
      },
    };
    axios
      .post(
        'https://live-chat-server-2nte.onrender.com/chat/createGroup',
        { name: groupName, users: `[]` },
        config
      )
      .then(() => {
        setGroupName('');
        navigate('/app/groups');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ ease: 'anticipate', duration: '0.2' }}
        className={'createGroup-container' + (lightTheme ? ' dark' : '')}
      >
        <input
          type='text'
          placeholder='Enter Group Name'
          className={'search-box' + (lightTheme ? ' dark' : '')}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <IconButton onClick={makeGroup}>
          <DoneOutlineRounded
            className={'icon' + (lightTheme ? ' dark' : '')}
          />
        </IconButton>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateGroup;
