import React, { useState } from 'react';
import logo from '../Images/live-chat.png';
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Toaster from './Toaster';

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [signUpStatus, setsignUpStatus] = useState('');
  const [logInStatus, setLogInStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const lightTheme = useSelector((state) => state.themeKey);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const signupHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(
        'http://localhost:5000/user/register',
        data,
        config
      );
      navigate('/app/welcome');
      localStorage.setItem('userData', JSON.stringify(response.data));
      setLoading(false);
    } catch (error) {
      if (error.response.status == 430) {
        setsignUpStatus({
          msg: 'User With This Email Already Exists',
          key: Math.random(),
        });
      }
      if (error.response.status == 431) {
        setsignUpStatus({
          msg: 'User With This Username Already Taken, Try Another',
          key: Math.random(),
        });
      }
      setLoading(false);
    }
  };

  const loginHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(
        'http://localhost:5000/user/login',
        data,
        config
      );
      setLoading(false);
      localStorage.setItem('userData', JSON.stringify(response));
      navigate('/app/welcome');
    } catch (error) {
      setLogInStatus({
        msg: 'Invalid Credentials',
        key: Math.random() * 100,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='secondary' />
      </Backdrop>
      <div className={'login-container' + (lightTheme ? ' dark' : '')}>
        <div className='image-container'>
          <img src={logo} alt='logo' className='welcome-logo' />
        </div>
        {showLogin && (
          <div className={'login-box' + (lightTheme ? ' dark' : '')}>
            <p className='login-text'>Login in to your account</p>
            <TextField
              id='standard-basic'
              label='Enter Username'
              name='name'
              // value={data.name}
              variant='outlined'
              onChange={(e) => changeHandler(e)}
            />
            <TextField
              id='outlined-password-input'
              label='Enter Password'
              name='password'
              type='password'
              autoComplete='current-password'
              onChange={(e) => changeHandler(e)}
            />
            <Button
              variant='outlined'
              onKeyDown={(event) => {
                if (event.code == 'Enter') {
                  loginHandler();
                }
              }}
              onClick={() => loginHandler()}
            >
              Login
            </Button>
            <p>
              Don't have an account?{' '}
              <span className='hyper' onClick={() => setShowLogin(false)}>
                Signup
              </span>
            </p>
            {logInStatus ? (
              <Toaster key={logInStatus.key} message={logInStatus.msg} />
            ) : null}
          </div>
        )}
        {!showLogin && (
          <div className={'login-box' + (lightTheme ? ' dark' : '')}>
            <p className='login-text'>Create your account</p>
            <TextField
              id='standard-basic'
              label='Create Username'
              variant='outlined'
              name='name'
              onChange={(e) => changeHandler(e)}
            />
            <TextField
              // id='standard-basic'
              label='Enter Email'
              variant='outlined'
              name='email'
              onChange={(e) => changeHandler(e)}
            />
            <TextField
              id='outlined-password-input'
              label='Create Password'
              type='password'
              autoComplete='current-password'
              name='password'
              onChange={(e) => changeHandler(e)}
            />
            <Button
              variant='outlined'
              onKeyDown={(event) => {
                if (event.code == 'Enter') {
                  signupHandler();
                }
              }}
              onClick={() => signupHandler()}
            >
              Create Account
            </Button>
            <p>
              Already have an account?{' '}
              <span className='hyper' onClick={() => setShowLogin(true)}>
                Signin
              </span>
            </p>
            {signUpStatus ? (
              <Toaster key={signUpStatus.key} message={signUpStatus.msg} />
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
