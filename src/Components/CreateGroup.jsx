import React from 'react';
import './mystyles.css';
import { IconButton } from '@mui/material';
import { DoneOutlineRounded } from '@mui/icons-material';

const CreateGroup = () => {
  return (
    <div className='createGroup-container'>
      <input
        type='text'
        placeholder='Enter Group Name'
        className='search-box'
      />
      <IconButton>
        <DoneOutlineRounded />
      </IconButton>
    </div>
  );
};

export default CreateGroup;
