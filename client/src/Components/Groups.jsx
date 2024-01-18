import React, { useContext, useEffect, useState } from 'react';
import logo from '../Images/live-chat.png';
import { IconButton } from '@mui/material';
import { Refresh, Search } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { myContext } from './MainContainer';
import socket from '../Features/socket';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const { refresh, setRefresh } = useContext(myContext);
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userData.data.token}`,
          },
        };
        const response = await axios.get(
          'https://live-chat-server-2nte.onrender.com/chat/fetchGroups',
          config
        );
        setGroups(response.data);
      } catch (error) {
        // Handle errors here
        console.error('Error fetching groups:', error);
      }
    };

    if (userData) {
      fetchGroups();
    } else {
      console.log('no user');
      navigate('/login');
    }
  }, [refresh, userData, navigate]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleGroupClick = async (group) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.data.token}`,
        },
      };

      await axios.put(
        'https://live-chat-server-2nte.onrender.com/chat/addSelfToGroup',
        {
          chatId: group._id,
          userId: userData.data._id,
        },
        config
      );

      setRefresh(!refresh);
      socket.emit('join chat', group._id);
      navigate(`/app/chat/${group._id}&${group.chatName}`);
    } catch (error) {
      // Handle errors here
      console.error('Error joining group:', error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ ease: 'anticipate', duration: '0.2' }}
        className={`list-container ${lightTheme ? 'dark' : ''}`}
      >
        <div className={`ug-header ${lightTheme ? 'dark' : ''}`}>
          <img
            src={logo}
            alt='logo'
            style={{ height: '2rem', width: '2rem', marginLeft: '10px' }}
          />
          <p className={`ug-title ${lightTheme ? 'dark' : ''}`}>
            Available Groups
          </p>
          <IconButton
            className={`icon ${lightTheme ? 'dark' : ''}`}
            onClick={handleRefresh}
          >
            <Refresh />
          </IconButton>
        </div>
        <div className={`sb-search ${lightTheme ? 'dark' : ''}`}>
          <IconButton>
            <Search className={`icon ${lightTheme ? 'dark' : ''}`} />
          </IconButton>
          <input
            type='text'
            placeholder='Search Groups'
            className={`search-box ${lightTheme ? 'dark' : ''}`}
          />
        </div>
        <div className={`ug-list ${lightTheme ? 'dark' : ''}`}>
          {groups.map((group) => (
            <motion.div
              key={group._id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`list-tem ${lightTheme ? 'dark' : ''}`}
              onClick={() => handleGroupClick(group)}
            >
              <p className='con-icon'>{group.chatName[0].toUpperCase()}</p>
              <p className={`con-title ${lightTheme ? 'dark' : ''}`}>
                {group.chatName}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Groups;
