/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (err) {
      setEmailAddress('');
      setPassword('');
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  return (
    <div className='container flex items-center h-screen max-w-screen-md mx-auto'>
      <div className='flex w-3/5'>
        <img src='/images/iphone-with-profile.jpg' alt='iPhone with profile' />
      </div>
      <div className='flex flex-col w-2/5'>
        <div className='flex flex-col items-center p-4 mb-4 bg-white border rounded border-gray-primary'>
          <h1 className='flex justify-center w-full'>
            <img
              src='images/logo.png'
              alt='Instagram'
              className='w-6/12 mt-2 mb-4'
            />
          </h1>

          {errorMessage && (
            <p className='mb-4 text-xs text-red-primary'>{errorMessage}</p>
          )}

          <form onSubmit={handleLogin} method='POST'>
            <input
              aria-label='Enter your Email address'
              type='text'
              placeholder='Email Address'
              className='w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary'
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              aria-label='Enter your password'
              type='password'
              placeholder='Password'
              className='w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary'
              onChange={({ target }) => setPassword(target.value)}
            />

            <button
              disabled={isInvalid}
              type='submit'
              className={`w-full h-8 font-bold text-white bg-blue-medium rounded ${
                isInvalid && 'opacity-50'
              }`}
            >
              Log In
            </button>
          </form>
        </div>
        <div className='flex flex-col items-center justify-center w-full p-4 bg-white border rounded border-gray-primary'>
          <p className='text-sm'>
            Don&apos;t have an account?
            <Link to='/signup' className='ml-1 font-bold text-blue-medium'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
