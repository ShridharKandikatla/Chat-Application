import React, { useContext, useEffect, useState } from 'react';
import logo from '../Images/live-chat.png';
import { IconButton } from '@mui/material';
import { Refresh, Search } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { myContext } from './MainContainer';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const { refresh, setRefresh } = useContext(myContext);
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!userData) {
    console.log('no user');
    navigate('/login');
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .get('http://localhost:5000/chat/fetchGroups', config)
      .then((response) => {
        setGroups(response.data);
      });
  }, [refresh]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ ease: 'anticipate', duration: '0.2' }}
        className='list-container'
      >
        <div className={'ug-header' + (lightTheme ? ' dark' : '')}>
          <img
            src={logo}
            alt='logo'
            style={{ height: '2rem', width: '2rem', marginLeft: '10px' }}
          />
          <p className={'ug-title' + (lightTheme ? ' dark' : '')}>
            Available Groups
          </p>
          <IconButton
            className={'icon' + (lightTheme ? ' dark' : '')}
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            <Refresh />
          </IconButton>
        </div>
        <div className={'sb-search' + (lightTheme ? ' dark' : '')}>
          <IconButton>
            <Search className={'icon' + (lightTheme ? ' dark' : '')} />
          </IconButton>
          <input
            type='text'
            placeholder='Search Groups'
            className={'search-box' + (lightTheme ? ' dark' : '')}
          />
        </div>
        <div className={'ug-list' + (lightTheme ? ' dark' : '')}>
          {groups.map((group, index) => (
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={'list-tem' + (lightTheme ? ' dark' : '')}
              key={index}
              onClick={() => {
                const config = {
                  headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                  },
                };
                axios
                  .put(
                    'http://localhost:5000/chat/addSelfToGroup',
                    {
                      chatId: group._id,
                      userId: userData.data._id,
                    },
                    config
                  )
                  .then(() => {
                    setRefresh(!refresh);
                    navigate(`/app/chat/${group._id}&${group.chatName}`);
                  });
              }}
            >
              <p className='con-icon'>{group.chatName[0].toUpperCase()}</p>
              <p className={'con-title' + (lightTheme ? ' dark' : '')}>
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
