import React, { useContext, useEffect, useRef, useState } from 'react';
import { IconButton, Skeleton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Send } from '@mui/icons-material';
import MessageOthers from './MessageOthers';
import MessageSelf from './MessageSelf';
import '../CSS/myStyles.css';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { myContext } from './MainContainer';
import { io } from 'socket.io-client';

var socket;
const ChatArea = () => {
  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setloaded] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split('&');
  const [allMessages, setAllMessages] = useState([]);
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem('userData'));

  const navigate = useNavigate();

  const sendMessage = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .post(
        'https://live-chat-server-2nte.onrender.com/message/',
        {
          content: messageContent,
          chatId: chat_id,
        },
        config
      )
      .then(({ data }) => {
        socket.emit('new message', data);
        setRefresh(!refresh);
      });
  };

  useEffect(() => {
    socket = io('https://live-chat-server-2nte.onrender.com');
    socket.emit('setup', userData);
    socket.on('connected', () => {
      setSocketConnectionStatus(!socketConnectionStatus);
    });
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .get(
        'https://live-chat-server-2nte.onrender.com/message/' + chat_id,
        config
      )
      .then(({ data }) => {
        setAllMessages(data);
        setloaded(true);
        socket.emit('join chat', chat_id);
      });
    setAllMessagesCopy(allMessages);
  }, [refresh, chat_id, userData.data.token, allMessages]);

  useEffect(() => {
    socket.on('message received', (newMessage) => {
      if (!allMessagesCopy || allMessagesCopy._id != newMessage._id) {
        // setAllMessages([...allMessages, newMessage]);
      } else {
        setAllMessagesCopy([...allMessages, newMessage]);
      }
    });
  });

  if (!loaded) {
    return (
      <div
        style={{
          border: '20px',
          padding: '10px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Skeleton
          variant='rectangular'
          sx={{ width: '100%', borderRadius: '10px' }}
          height={60}
        />
        <Skeleton
          variant='rectangular'
          sx={{
            width: '100%',
            borderRadius: '10px',
            flexGrow: '1',
          }}
        />
        <Skeleton
          variant='rectangular'
          sx={{ width: '100%', borderRadius: '10px' }}
          height={60}
        />
      </div>
    );
  } else {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ ease: 'anticipate', duration: '0.1' }}
          className='chatArea-container'
        >
          <div className={'chatArea-header' + (lightTheme ? ' dark' : '')}>
            <p className={'con-icon' + (lightTheme ? ' dark' : '')}>
              {chat_user[0].toUpperCase() || ''}
            </p>
            <div className={'header-text' + (lightTheme ? ' dark' : '')}>
              <p className={'con-title' + (lightTheme ? ' dark' : '')}>
                {chat_user}
              </p>
            </div>
            <IconButton
              className={'icon' + (lightTheme ? ' dark' : '')}
              onClick={() => {
                const config = {
                  headers: {
                    Authorization: 'Bearer ' + userData.data.token,
                  },
                };
                axios
                  .put(
                    'https://live-chat-server-2nte.onrender.com/chat/groupExit',
                    {
                      chatId: chat_id,
                      userId: userData.data._id,
                    },
                    config
                  )
                  .then(() => {
                    setRefresh(!refresh);
                    navigate('/app/welcome');
                  });
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <div className={'message-container' + (lightTheme ? ' dark' : '')}>
            {allMessages
              .slice(0)
              .reverse()
              .map((message, index) => {
                const sender = message.sender;
                const self_id = userData.data._id;
                if (sender._id === self_id) {
                  return <MessageSelf props={message} key={index} />;
                } else {
                  return <MessageOthers props={message} key={index} />;
                }
              })}
          </div>
          {/* <div ref={messagesEndRef} className='BOTTOM' /> */}
          <div className={'text-input-area' + (lightTheme ? ' dark' : '')}>
            <input
              placeholder='Type a Message'
              className={'search-box' + (lightTheme ? ' dark' : '')}
              value={messageContent}
              onChange={(e) => {
                setMessageContent(e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.code == 'Enter') {
                  sendMessage();
                  setMessageContent('');
                  setRefresh(!refresh);
                }
              }}
            />
            <IconButton
              className={'icon' + (lightTheme ? ' dark' : '')}
              onClick={() => {
                sendMessage();
                setMessageContent('');
                setRefresh(!refresh);
              }}
            >
              <Send />
            </IconButton>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
};

export default ChatArea;
