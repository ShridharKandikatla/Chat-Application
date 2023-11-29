import React from 'react';
import './myStyles.css';
import logo from '../Images/live-chat.png';
import { IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Users = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div className='list-container'>
      <div className={'ug-header' + (lightTheme ? ' dark' : '')}>
        <img
          src={logo}
          alt='logo'
          style={{ height: '2rem', width: '2rem', marginLeft: '10px' }}
        />
        <p className={'ug-title' + (lightTheme ? ' dark' : '')}>Online Users</p>
      </div>
      <div className={'sb-search' + (lightTheme ? ' dark' : '')}>
        <IconButton>
          <Search className={'icon' + (lightTheme ? ' dark' : '')} />
        </IconButton>
        <input
          type='text'
          placeholder='Search Users'
          className={'search-box' + (lightTheme ? ' dark' : '')}
        />
      </div>
      <div className='ug-list'>
        <div className={'list-tem' + (lightTheme ? ' dark' : '')}>
          <p className='con-icon'>T</p>
          <p className={'con-title' + (lightTheme ? ' dark' : '')}>Test User</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-tem'>
          <p className='con-icon'>T</p>
          <p className='con-title'>Test User</p>
        </div>
      </div>
    </div>
  );
};

export default Users;
