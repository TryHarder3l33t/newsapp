import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostImage } from '../../store/posts.store/posts.slice';

export const CreatePostPage = () => {
  const [image, setImage] = useState('');
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const submit = async (event) => {
    event.preventDefault();
    let imageResponse;
    const formData = new FormData();
    if (image) {
      formData.append('data', image);
      imageResponse = await dispatch(createPostImage(formData));
    }

    formData.append('data', text);
  };

  const onFileSelected = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const onTextSelected = (event) => {
    setText(event.target.value);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <form
        onSubmit={submit}
        style={{ width: 650 }}
        className='flex flex-col space-y-5 px-5 py-14'
      >
        <input onChange={onFileSelected} type='file' accept='image/*'></input>
        <input
          value={text}
          onChange={onTextSelected}
          type='text'
          placeholder='Caption'
        ></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
