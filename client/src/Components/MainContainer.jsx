import React, { createContext, useState } from 'react';
import Sidebar from './Sidebar';
import './myStyles.css';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const myContext = createContext();
const MainContainer = () => {
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const [refresh, setRefresh] = useState(true);
  
  return (
    <div className={'MainContainer' + (lightTheme ? ' dark' : '')}>
      <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
        <Sidebar />
        <Outlet />
      </myContext.Provider>
    </div>
  );
};

export default MainContainer;
