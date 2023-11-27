import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import './myStyles.css';
import Welcome from './Welcome';
import CreateGroup from './CreateGroup';

const MainContainer = () => {
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
  return (
    <div className='MainContainer'>
      <Sidebar conversations={conversations} />
      {/* <ChatArea conversations={conversations} /> */}
      {/* <Welcome /> */}
      <CreateGroup />
    </div>
  );
};

export default MainContainer;
