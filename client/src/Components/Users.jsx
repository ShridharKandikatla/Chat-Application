import logo from '../Images/live-chat.png';
import { IconButton } from '@mui/material';
import { Refresh, Search } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { myContext } from './MainContainer';
import socket from '../Features/socket';
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { refresh, setRefresh } = useContext(myContext);
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();

  if (!userData) {
    console.log('no user');
    navigate(-1);
  }

  const fetchUsers = useCallback(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .get('http://localhost:5000/user/fetchUsers', config)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error(err); // Better error handling
      });
  }, [userData.data.token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, refresh]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleRefresh = useCallback(() => {
    setRefresh(!refresh);
  }, [refresh, setRefresh]);

  const handleUserClick = useCallback(
    (user) => {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.data.token}`,
        },
      };
      axios
        .post(
          'http://localhost:5000/chat/access',
          {
            userId: user._id,
          },
          config
        )
        .then(() => {
          setRefresh(!refresh);
          socket.emit('join chat', user._id); // Make sure socket is defined
          navigate(`/app/chat/${user._id}&${user.name}`);
        })
        .catch((err) => {
          console.error(err); // Better error handling
        });
    },
    [users, userData.data.token, refresh, setRefresh, navigate]
  );

  // Define a theme class only once using useMemo
  const themeClass = useMemo(() => (lightTheme ? ' dark' : ''), [lightTheme]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ ease: 'anticipate', duration: '0.2' }}
        className={`list-container${themeClass}`}
      >
        <div className={`ug-header${themeClass}`}>
          <img
            src={logo}
            alt='logo'
            style={{ height: '2rem', width: '2rem', marginLeft: '10px' }}
          />
          <p className={`ug-title${themeClass}`}>Available Users</p>
          <IconButton className={`icon${themeClass}`} onClick={handleRefresh}>
            <Refresh />
          </IconButton>
        </div>
        <div className={`sb-search${themeClass}`}>
          <IconButton>
            <Search className={`icon${themeClass}`} />
          </IconButton>
          <input
            type='text'
            placeholder='Search Users'
            className={`search-box${themeClass}`}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
        <div className={`ug-list${themeClass}`}>
          {filteredUsers.map((user) => (
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`list-tem${themeClass}`}
              key={user._id} // Use user._id instead of index for key
              onClick={() => handleUserClick(user)}
            >
              <p className='con-icon'>{user.name[0].toUpperCase()}</p>
              <p className={`con-title${themeClass}`}>{user.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Users;
