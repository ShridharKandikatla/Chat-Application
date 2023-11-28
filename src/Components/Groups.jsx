import React from 'react';
import './myStyles.css';
import logo from '../Images/live-chat.png';
import { IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

const Groups = () => {
  return (
    <div className='list-container'>
      <div className='ug-header'>
        <img
          src={logo}
          alt='logo'
          style={{ height: '2rem', width: '2rem', marginLeft: '10px' }}
        />
        <p className='ug-title'>Available Groups</p>
      </div>
      <div className='sb-search'>
        <IconButton>
          <Search />
        </IconButton>
        <input type='text' placeholder='Search Groups' className='search-box' />
      </div>
      <div className='ug-list'>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test Group</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test Group</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test Group</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test Group</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test Group</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test Group</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test Group</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test Group</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test Group</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test Group</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test Group</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test Group</p>
        </div>
      </div>
    </div>
  );
};

export default Groups;
