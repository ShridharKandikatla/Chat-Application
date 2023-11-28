import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import './myStyles.css';
import Welcome from './Welcome';
import CreateGroup from './CreateGroup';
import Users from './Users';
import Groups from './Groups';
import { Outlet } from 'react-router-dom';

const MainContainer = () => {
  return (
    <div className='MainContainer'>
      <Sidebar />
      <Outlet />
      {/* <Welcome /> */}
      {/* <CreateGroup /> */}
      {/* <ChatArea conversations={conversations} /> */}
      {/* <Users /> */}
      {/* <Groups/> */}
    </div>
  );
};

export default MainContainer;
