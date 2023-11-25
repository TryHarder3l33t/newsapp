import React from 'react';
import { useParams } from 'react-router-dom';

export const UserPasswordResetPage = () => {
  const params = useParams();
  console.log('hello');
  console.log(params.token);

  return (
    <div>
      {params.token}
      {params.email}
    </div>
  );
};
