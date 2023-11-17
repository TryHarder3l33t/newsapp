import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUser,
  setCreateUserStatusIdle,
} from '../../store/user.store/user.slice';
import { useNavigate } from 'react-router-dom';
import { loginToken } from '../../store/user.store/user.slice';

// Sign Up
export const UserCreatePage = () => {
  const dispatch = useDispatch();
  // const login = (token) => {
  //   console.log('logging in');
  //   dispatch(login(token));
  // };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loginToken(token));
    }
    //dispatch(setCreateUserStatusIdle());
  }, []);

  const createUserStatus = useSelector((state) => state.users.createUserStatus);
  const createUserError = useSelector((state) => state.users.createUserError);
  const navigate = useNavigate();

  let [firstName, setFirstName] = useState('Jane');
  let [lastName, setLastName] = useState('Doe');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const canSaveForm = firstName && lastName && email;

  const onSaveSignUpClicked = () => {
    const payload = {};
    payload.firstName = firstName;
    payload.lastName = lastName;
    payload.email = email;
    payload.password = password;

    if (canSaveForm) {
      try {
        dispatch(createUser(payload));
        // setTimeout(function () {
        //   navigate('/users');
        // }, 750);
      } catch (error) {
        console.log(Error);
      } finally {
        setEmail('');
        setFirstName('');
        setLastName('');
      }
    }
  };

  if (createUserStatus === 'succeeded') {
  }
  if (createUserStatus === 'idle') {
    return (
      <section>
        <h2>Sign Up</h2>
        <form>
          <label htmlFor='firstName'>First Name</label>
          <input
            autoComplete='given-name'
            type='text'
            id='firstName'
            name='firstName'
            value={firstName}
            onChange={onFirstNameChanged}
          />
          <br />
          <label htmlFor='lastName'>Last Name</label>
          <input
            autoComplete='family-name'
            type='text'
            id='lastName'
            name='lastName'
            value={lastName}
            onChange={onLastNameChanged}
          />
          <br />
          <label htmlFor='email'>Email</label>
          <input
            autoComplete='email'
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={onEmailChanged}
            size='40'
          />
          <br />
          <label htmlFor='password'>Password</label>
          <input
            autoComplete='current-password'
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={onPasswordChanged}
            size='40'
          />
          <button
            type='button'
            onClick={onSaveSignUpClicked}
            disabled={!canSaveForm}
          >
            Sign Up
          </button>
        </form>
      </section>
    );
  } else if (createUserStatus === 'loading') {
    return <h2>LOADING...</h2>;
  } else if (createUserStatus === 'succeeded') {
    return (
      <div>
        <h1>Success</h1>
      </div>
    );
  } else if (createUserStatus === 'error') {
    return <div>{createUserError}</div>;
  }

  return <div>SignUp</div>;
};
