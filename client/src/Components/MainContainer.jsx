import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import './myStyles.css';
import Welcome from './Welcome';
import CreateGroup from './CreateGroup';
import Users from './Users';
import Groups from './Groups';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainContainer = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div className={'MainContainer' + (lightTheme ? ' dark' : '')}>
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
