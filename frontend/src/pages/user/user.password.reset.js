import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { passwordReset } from '../../store/users.slice';

export const UserPasswordResetPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [password, setPassword] = useState('');
  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('submit');
    const formData = new FormData();
    formData.append('token', params.token);
    formData.append('email', params.email);
    formData.append('password', password);
    setPassword('');
    const response = await dispatch(passwordReset(formData));
    console.log(response);
  };

  return (
    <form onSubmit={onSubmit}>
      <br />
      <br />
      <label htmlFor='password'> Password</label>
      <input
        id='password'
        name='Password'
        value={password}
        onChange={onPasswordChanged}
      ></input>
      <br />
      <br />
      <button type='submit'>SUBMIT</button>
    </form>
  );
};
