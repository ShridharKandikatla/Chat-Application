import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import MainContainer from './Components/MainContainer';
import Welcome from './Components/Welcome';
import ChatArea from './Components/ChatArea';
import Users from './Components/Users';
import CreateGroup from './Components/CreateGroup';
import Groups from './Components/Groups';
import { useSelector } from 'react-redux';
import ChatList from './Components/ChatList';
function App() {
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <>
      <div className={'App' + (lightTheme ? ' black' : '')}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='app' element={<MainContainer />}>
            <Route path='welcome' element={<Welcome />} />
            <Route path='chat/:_id' element={<ChatArea />} />
            <Route path='users' element={<Users />} />
            <Route path='groups' element={<Groups />} />
            <Route path='create-group' element={<CreateGroup />} />
            <Route path='chatlist' element={<ChatList />} />
            <Route path='chatlist/chat/:_id' element={<ChatArea />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
