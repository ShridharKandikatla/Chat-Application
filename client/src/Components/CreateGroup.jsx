import React from 'react';
import './mystyles.css';
import { IconButton } from '@mui/material';
import { DoneOutlineRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

const CreateGroup = () => {
  const lightTheme = useSelector((state) => state.themeKey);
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
        />
        <IconButton>
          <DoneOutlineRounded
            className={'icon' + (lightTheme ? ' dark' : '')}
          />
        </IconButton>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateGroup;
