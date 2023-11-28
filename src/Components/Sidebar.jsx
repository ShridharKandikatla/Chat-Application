import ConversationItem from './ConversationItem';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { AccountCircle } from '@mui/icons-material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import './myStyles.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();
  return (
    <div className='sidebar-container'>
      <div className='sb-header'>
        <div>
          <IconButton onClick={() => navigate('welcome')}>
            <AccountCircle />
          </IconButton>
        </div>
        <div>
          <IconButton onClick={() => navigate('users')}>
            <PersonAddIcon />
          </IconButton>
          <IconButton onClick={() => navigate('groups')}>
            <GroupAddIcon />
          </IconButton>
          <IconButton onClick={() => navigate('create-group')}>
            <AddCircleIcon />
          </IconButton>
          <IconButton>
            <NightlightIcon />
          </IconButton>
        </div>
      </div>
      <div className='sb-search'>
        <IconButton>
          <PersonSearchIcon />
        </IconButton>
        <input type='text' placeholder='Search' className='search-box' />
      </div>
      <div className='sb-conversations'>
        {conversations.map((conversation, index) => {
          return <ConversationItem key={index} props={conversation} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
