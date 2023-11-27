import React from 'react';
import { useParams } from 'react-router-dom';

export const PostReadPage = () => {
  const params = useParams();

  if (params.id) {
    return <div>{params.id}</div>;
  } else {
    return <div>No post</div>;
  }
};
