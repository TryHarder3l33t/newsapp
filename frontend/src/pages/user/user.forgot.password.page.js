import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../store/users.slice';

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  };

  const formData = new FormData();

  const onSubmit = async (e) => {
    e.preventDefault();
    formData.append('email', email);
    const yesNoMaybe = await dispatch(forgotPassword(formData));
  };
  return (
    <form onSubmit={onSubmit}>
      <br />
      <br />
      <label htmlFor='email'> Email</label>
      <input
        id='email'
        name='email'
        value={email}
        onChange={onEmailChanged}
      ></input>
      <br />
      <br />
      <button type='submit'>SUBMIT</button>
    </form>
  );
};
