import React from 'react';
import './myStyles.css';
import logo from '../Images/live-chat.png';
import { IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

const Groups = () => {
  const lightTheme = useSelector((state) => state.themeKey);
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
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={'list-tem' + (lightTheme ? ' dark' : '')}
          >
            <p className='con-icon'>T</p>
            <p className={'con-title' + (lightTheme ? ' dark' : '')}>
              Test Group
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={'list-tem' + (lightTheme ? ' dark' : '')}
          >
            <p className='con-icon'>T</p>
            <p className={'con-title' + (lightTheme ? ' dark' : '')}>
              Test Group
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={'list-tem' + (lightTheme ? ' dark' : '')}
          >
            <p className='con-icon'>T</p>
            <p className={'con-title' + (lightTheme ? ' dark' : '')}>
              Test Group
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            className={'list-tem' + (lightTheme ? ' dark' : '')}
          >
            <p className='con-icon'>T</p>
            <p className={'con-title' + (lightTheme ? ' dark' : '')}>
              Test Group
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={'list-tem' + (lightTheme ? ' dark' : '')}
          >
            <p className='con-icon'>T</p>
            <p className={'con-title' + (lightTheme ? ' dark' : '')}>
              Test Group
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Groups;
