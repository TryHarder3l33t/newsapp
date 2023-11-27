import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPostImage } from '../../store/posts.slice.js';
import { loginToken } from '../../store/users.slice.js';
import { useNavigate } from 'react-router-dom';

export const CreatePostPage = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginTokenStatus = useSelector((state) => state.users.loginTokenStatus);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loginToken(token));
    } else {
      navigate('/signup');
    }
  }, []);

  let user = useSelector((state) => state.users.user);
  if (!user.firstName) {
    const token = localStorage.getItem('token');
    if (token) {
    }
  }

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

  if (loginTokenStatus === 'idle' || loginTokenStatus === 'succeeded') {
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
  } else if (loginTokenStatus === 'loading') {
    return <div>LOADING</div>;
  } else if (loginTokenStatus === 'error') {
    navigate('/signup');
    return <div>{loginTokenStatus}</div>;
  }
};
