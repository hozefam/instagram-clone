/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

const SignUp = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);

    if (!usernameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        await createdUserResult.user.updateProfile({
          displayName: username
        });

        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          follwing: [],
          dateCreated: Date.now()
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setUsername('');
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage('That username is already taken, please try another');
    }
  };

  useEffect(() => {
    document.title = 'SignUp - Instagram';
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

          <form onSubmit={handleSignUp} method='POST'>
            <input
              aria-label='Enter your Username'
              type='text'
              placeholder='Username'
              className='w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary'
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label='Enter your Fullname'
              type='text'
              placeholder='Full Name'
              className='w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary'
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label='Enter your Email address'
              type='text'
              placeholder='Email Address'
              className='w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary'
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label='Enter your password'
              type='password'
              placeholder='Password'
              className='w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary'
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />

            <button
              disabled={isInvalid}
              type='submit'
              className={`w-full h-8 font-bold text-white bg-blue-medium rounded ${
                isInvalid && 'opacity-50'
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className='flex flex-col items-center justify-center w-full p-4 bg-white border rounded border-gray-primary'>
          <p className='text-sm'>
            Have an account?
            <Link to={ROUTES.LOGIN} className='ml-1 font-bold text-blue-medium'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
