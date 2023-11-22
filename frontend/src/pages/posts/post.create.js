import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostImage } from '../../store/posts.slice.js';

export const CreatePostPage = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const onFileSelected = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const onTitleSelected = (event) => {
    setTitle(event.target.value);
  };

  const onContentSelected = (event) => {
    setContent(event.target.value);
  };

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('data', image);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('token', localStorage.getItem('token'));
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
          value={title}
          onChange={onTitleSelected}
          type='text'
          placeholder='Title'
        ></input>
        <br />
        <input
          value={content}
          onChange={onContentSelected}
          type='text'
          placeholder='Content'
        ></input>
        <br />
        <input onChange={onFileSelected} type='file' accept='image/*'></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
