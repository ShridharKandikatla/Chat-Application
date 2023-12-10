import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { myContext } from './MainContainer';
import axios from 'axios';

const ChatList = () => {
  const [conversations, setConversation] = useState([]);
  const { refresh, setRefresh } = useContext(myContext);
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();

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
    axios
      .get('https://live-chat-server-2nte.onrender.com/chat/', config)
      .then((response) => {
        setConversation(response.data);
      });
  }, [refresh]);

  return (
    <div className='sb-chatlist-container'>
      <div className={'sb-chatlistsearch' + (lightTheme ? ' dark' : '')}>
        <IconButton>
          <PersonSearchIcon className={'icon' + (lightTheme ? ' dark' : '')} />
        </IconButton>
        <input
          type='text'
          placeholder='Search'
          className={'search-box' + (lightTheme ? ' dark' : '')}
        />
      </div>
      <div className={'sb-chatlist' + (lightTheme ? ' dark' : '')}>
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
                  setRefresh(true);
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
                    {chatname[0].toUpperCase()}
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
                  {chatname[0]}
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

export default ChatList;
