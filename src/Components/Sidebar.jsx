import ConversationItem from './ConversationItem';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { AccountCircle, LightMode } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './myStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/ThemeSlice';

const Sidebar = () => {
  const [conversations] = useState([
    {
      name: 'Shree',
      lastMessage: 'Hello',
      timeStamp: 'Today',
    },
    {
      name: 'Vishal',
      lastMessage: 'Good Morning',
      timeStamp: 'Today',
    },
    {
      name: 'Bhavin',
      lastMessage: 'Nice to meet you',
      timeStamp: 'Yesterday',
    },
  ]);

  // const [lightTheme, setLightTheme] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);

  return (
    <div className='sidebar-container'>
      <div className={'sb-header' + (lightTheme ? ' dark' : '')}>
        <div>
          <IconButton onClick={() => navigate('welcome')}>
            <AccountCircle className={'icon' + (lightTheme ? ' dark' : '')} />
          </IconButton>
        </div>
        <div>
          <IconButton onClick={() => navigate('users')}>
            <PersonAddIcon className={'icon' + (lightTheme ? ' dark' : '')} />
          </IconButton>
          <IconButton onClick={() => navigate('groups')}>
            <GroupAddIcon className={'icon' + (lightTheme ? ' dark' : '')} />
          </IconButton>
          <IconButton onClick={() => navigate('create-group')}>
            <AddCircleIcon className={'icon' + (lightTheme ? ' dark' : '')} />
          </IconButton>
          <IconButton onClick={() => dispatch(toggleTheme())}>
            {lightTheme && (
              <LightMode className={'icon' + (lightTheme ? ' dark' : '')} />
            )}
            {!lightTheme && (
              <NightlightIcon
                className={'icon' + (lightTheme ? ' dark' : '')}
              />
            )}
          </IconButton>
        </div>
      </div>
      <div className={'sb-search' + (lightTheme ? ' dark' : '')}>
        <IconButton>
          <PersonSearchIcon className={'icon' + (lightTheme ? ' dark' : '')} />
        </IconButton>
        <input
          type='text'
          placeholder='Search'
          className={'search-box' + (lightTheme ? ' dark' : '')}
        />
      </div>
      <div className={'sb-conversations' + (lightTheme ? ' dark' : '')}>
        {conversations.map((conversation, index) => {
          return <ConversationItem key={index} props={conversation} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
