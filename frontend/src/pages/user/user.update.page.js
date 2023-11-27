import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readUser, updateUser } from '../../store/users.slice.js';
import { useParams } from 'react-router-dom';

// Profile
export const UserUpdatePage = ({ match }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const readUserStatus = useSelector((state) => state.users.readUserStatus);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(readUser(params.userId));
  }, []);

  let user = useSelector((state) => state.users.user);

  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);

  const onSaveUserClicked = () => {
    const payload = {
      id: user.id,
      firstName: firstName === '' ? user.firstName : firstName,
      lastName: lastName === '' ? user.lastName : lastName,
      email: email === '' ? user.email : email,
    };
    console.log(JSON.stringify(payload));
    dispatch(updateUser(payload));
  };

  if (readUserStatus === 'idle') {
    return <div id='firstName'>LOADING...</div>;
  } else if (readUserStatus === 'loading') {
    return <div id='firstName'>LOADING...</div>;
  } else if (readUserStatus === 'succeeded') {
    return (
      <section>
        <h2>PROFILE</h2>
        <form>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            value={firstName}
            placeholder={user.firstName}
            onChange={onFirstNameChanged}
          ></input>
          <br />
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            value={lastName}
            placeholder={user.lastName}
            onChange={onLastNameChanged}
          ></input>
          <br />
          <label htmlFor='Email'>Email</label>
          <input
            type='text'
            id='email'
            name='email'
            value={email}
            placeholder={user.email}
            onChange={onEmailChanged}
          ></input>
          <br />
          <button type='button' onClick={onSaveUserClicked}>
            SUBMIT
          </button>
        </form>
      </section>
    );
  } else if (readUserStatus === 'error') {
    return <div> Sorry something went wrong :( </div>;
  }
};
