import React from 'react';
import './mystyles.css';
import { IconButton } from '@mui/material';
import { DoneOutlineRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const CreateGroup = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div className={'createGroup-container' + (lightTheme ? ' dark' : '')}>
      <input
        type='text'
        placeholder='Enter Group Name'
        className={'search-box' + (lightTheme ? ' dark' : '')}
      />
      <IconButton>
        <DoneOutlineRounded className={'icon' + (lightTheme ? ' dark' : '')} />
      </IconButton>
    </div>
  );
};

export default CreateGroup;
