// import { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import IconButton from '@mui/material/IconButton';
// import PersonSearchIcon from '@mui/icons-material/PersonSearch';
// import { myContext } from './MainContainer';
// import axios from 'axios';
// import socket from '../Features/socket';

// const ChatList = () => {
//   const [conversations, setConversation] = useState([]);
//   const { refresh, setRefresh } = useContext(myContext);
//   const lightTheme = useSelector((state) => state.themeKey);
//   const userData = JSON.parse(localStorage.getItem('userData'));
//   const navigate = useNavigate();

//   if (!userData) {
//     console.log('no user');
//     navigate('/');
//   }

//   useEffect(() => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${userData.data.token}`,
//       },
//     };
//     axios
//       .get('https://live-chat-server-2nte.onrender.com/chat/', config)
//       .then((response) => {
//         setConversation(response.data);
//       });
//   }, [refresh]);

//   useEffect(() => {
//     socket.on('message received', () => {
//       setRefresh(!refresh);
//     });
//   });

//   return (
//     <div className='sb-chatlist-container'>
//       <div className={'sb-chatlistsearch' + (lightTheme ? ' dark' : '')}>
//         <IconButton>
//           <PersonSearchIcon className={'icon' + (lightTheme ? ' dark' : '')} />
//         </IconButton>
//         <input
//           type='text'
//           placeholder='Search'
//           className={'search-box' + (lightTheme ? ' dark' : '')}
//         />
//       </div>
//       <div className={'sb-chatlist' + (lightTheme ? ' dark' : '')}>
//         {conversations.map((conversation, index) => {
//           var chatname = '';
//           if (conversation.isGroupChat) {
//             chatname = conversation.chatName;
//           } else {
//             conversation.users.map((user) => {
//               if (user._id != userData.data._id) {
//                 chatname = user.name;
//               }
//             });
//           }
//           if (conversation.latestMessage === undefined) {
//             return (
//               <div
//                 key={index}
//                 onClick={() => {
//                   setRefresh(true);
//                 }}
//               >
//                 <div
//                   key={index}
//                   className='conversation-container'
//                   onClick={() => {
//                     navigate('chat/' + conversation._id + '&' + chatname);
//                   }}
//                   // dispatch change to refresh so as to update chatArea
//                 >
//                   <p className={'con-icon' + (lightTheme ? ' dark' : '')}>
//                     {chatname[0].toUpperCase()}
//                   </p>
//                   <p className={'con-title' + (lightTheme ? ' dark' : '')}>
//                     {chatname}
//                   </p>
//                   <p
//                     className={'con-lastMessage' + (lightTheme ? ' dark' : '')}
//                   >
//                     No previous Messages, click here to start a new chat
//                   </p>
//                 </div>
//               </div>
//             );
//           } else {
//             return (
//               <div
//                 key={index}
//                 className='conversation-container'
//                 onClick={() => {
//                   navigate('chat/' + conversation._id + '&' + chatname);
//                   socket.emit('join chat', conversation._id);
//                 }}
//               >
//                 <p className={'con-icon' + (lightTheme ? ' dark' : '')}>
//                   {chatname[0]}
//                 </p>
//                 <p className={'con-title' + (lightTheme ? ' dark' : '')}>
//                   {chatname}
//                 </p>
//                 <p className={'con-lastMessage' + (lightTheme ? ' dark' : '')}>
//                   {conversation.latestMessage.content}
//                 </p>
//               </div>
//             );
//           }
//         })}
//       </div>
//     </div>
//   );
// };

// export default ChatList;

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { myContext } from './MainContainer';
import axios from 'axios';
import socket from '../Features/socket';
import classNames from 'classnames';

const ChatList = () => {
  const [conversations, setConversation] = useState([]);
  const { refresh, setRefresh } = useContext(myContext);
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userData.data.token}`,
          },
        };
        const response = await axios.get(
          'https://live-chat-server-2nte.onrender.com/chat/',
          config
        );
        setConversation(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, e.g., redirect to an error page
      }
    };

    if (userData) {
      fetchData();
    } else {
      console.log('no user');
      navigate('/');
    }
  }, [userData, refresh]);

  useEffect(() => {
    const handleReceivedMessage = () => {
      setRefresh((prevRefresh) => !prevRefresh);
    };

    socket.on('message received', handleReceivedMessage);

    return () => {
      socket.off('message received', handleReceivedMessage);
    };
  }, [setRefresh]);

  const getChatName = (conversation) => {
    if (conversation.isGroupChat) {
      return conversation.chatName;
    } else {
      const otherUser = conversation.users.find(
        (user) => user._id !== userData.data._id
      );
      return otherUser ? otherUser.name : '';
    }
  };

  return (
    <div className={classNames('sb-chatlist-container', { dark: lightTheme })}>
      <div className={classNames('sb-chatlistsearch', { dark: lightTheme })}>
        <IconButton>
          <PersonSearchIcon
            className={classNames('icon', { dark: lightTheme })}
          />
        </IconButton>
        <input
          type='text'
          placeholder='Search'
          className={classNames('search-box', { dark: lightTheme })}
        />
      </div>
      <div className={classNames('sb-chatlist', { dark: lightTheme })}>
        {conversations.map((conversation) => {
          const chatname = getChatName(conversation);

          return (
            <div
              key={conversation._id}
              className='conversation-container'
              onClick={() => {
                navigate(`chat/${conversation._id}&${chatname}`);
                socket.emit('join chat', conversation._id);
              }}
            >
              <p className={classNames('con-icon', { dark: lightTheme })}>
                {chatname[0].toUpperCase()}
              </p>
              <p className={classNames('con-title', { dark: lightTheme })}>
                {chatname}
              </p>
              <p
                className={classNames('con-lastMessage', { dark: lightTheme })}
              >
                {conversation.latestMessage
                  ? conversation.latestMessage.content
                  : 'No previous Messages, click here to start a new chat'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
