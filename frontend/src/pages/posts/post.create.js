import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostImage } from '../../store/posts.slice.js';

export const CreatePostPage = () => {
  const [image, setImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const dispatch = useDispatch();

  const onFileSelected = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const onFirstNameSelected = (event) => {
    setFirstName(event.target.value);
  };

  const onLastNameSelected = (event) => {
    setLastName(event.target.value);
  };

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('data', image);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      await dispatch(createPostImage(formData));
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <form
        onSubmit={submit}
        style={{ width: 650 }}
        className='flex flex-col space-y-5 px-5 py-14'
      >
        <input
          value={firstName}
          onChange={onFirstNameSelected}
          type='text'
          placeholder='FirstName'
        ></input>
        <br />
        <input
          value={lastName}
          onChange={onLastNameSelected}
          type='text'
          placeholder='LastName'
        ></input>
        <br />
        <input onChange={onFileSelected} type='file' accept='image/*'></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
