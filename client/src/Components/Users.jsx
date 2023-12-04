import React, { useEffect, useState } from 'react';
import './myStyles.css';
import logo from '../Images/live-chat.png';
import { IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  if (!userData) {
    console.log('no user');
    navigate(-1);
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    // console.log(userData);
    axios
      .get('http://localhost:5000/user/fetchUsers', config)
      .then((response) => {
        setUsers(response.data);
      });
  }, []);

  // const handleSearch = (value) => {
  //   const usersCopy = [...users];
  //   if (value === '') {
  //     setUsers(usersCopy);
  //   }
  //   const filteredUsers = usersCopy.filter((user) => {
  //     return user.name.toLowerCase().includes(value.toLowerCase());
  //   });
  //   setUsers(filteredUsers);
  // };

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
            Available Users
          </p>
        </div>
        <div className={'sb-search' + (lightTheme ? ' dark' : '')}>
          <IconButton>
            <Search className={'icon' + (lightTheme ? ' dark' : '')} />
          </IconButton>
          <input
            type='text'
            placeholder='Search Users'
            className={'search-box' + (lightTheme ? ' dark' : '')}
            // onChange={(e) => {
            //   handleSearch(e.target.value);
            // }}
          />
        </div>
        <div className={'ug-list' + (lightTheme ? ' dark' : '')}>
          {users.map((user) => (
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={'list-tem' + (lightTheme ? ' dark' : '')}
              key={user._id}
              onClick={() => {
                console.log('clicked username:' + user.name);
              }}
            >
              <p className='con-icon'>{user.name[0]}</p>
              <p className={'con-title' + (lightTheme ? ' dark' : '')}>
                {user.name}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Users;
