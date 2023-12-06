import ConversationItem from './ConversationItem';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { AccountCircle, ExitToApp, LightMode } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/ThemeSlice';
import { myContext } from './MainContainer';
import axios from 'axios';
import './myStyles.css';

const Sidebar = () => {
  const [conversations, setConversation] = useState([]);
  const { refresh, setRefresh } = useContext(myContext);
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!userData) {
    console.log('no user');
    navigate('/');
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios.get('http://localhost:5000/chat/', config).then((response) => {
      setConversation(response.data);
    });
  });

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
          <IconButton
            onClick={() => {
              localStorage.removeItem('userData');
              navigate('/');
            }}
          >
            <ExitToApp className={'icon' + (lightTheme ? ' dark' : '')} />
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
          var chatname = '';
          if (conversation.isGroupChat) {
            chatname = conversation.chatName;
          } else {
            conversation.users.map((user) => {
              if (user._id != userData.data._id) {
                chatname = user.name;
              }
            });
          }
          if (conversation.latestMessage === undefined) {
            return (
              <div
                key={index}
                onClick={() => {
                  setRefresh(!refresh);
                }}
              >
                <div
                  key={index}
                  className='conversation-container'
                  onClick={() => {
                    navigate('chat/' + conversation._id + '&' + chatname);
                  }}
                  // dispatch change to refresh so as to update chatArea
                >
                  <p className={'con-icon' + (lightTheme ? ' dark' : '')}>
                    {chatname[0]}
                  </p>
                  <p className={'con-title' + (lightTheme ? ' dark' : '')}>
                    {chatname}
                  </p>
                  <p
                    className={'con-lastMessage' + (lightTheme ? ' dark' : '')}
                  >
                    No previous Messages, click here to start a new chat
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className='conversation-container'
                onClick={() => {
                  navigate('chat/' + conversation._id + '&' + chatname);
                }}
              >
                <p className={'con-icon' + (lightTheme ? ' dark' : '')}>
                  {chatname[0].toUpperCase()}
                </p>
                <p className={'con-title' + (lightTheme ? ' dark' : '')}>
                  {chatname}
                </p>
                <p className={'con-lastMessage' + (lightTheme ? ' dark' : '')}>
                  {conversation.latestMessage.content}
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Sidebar;
