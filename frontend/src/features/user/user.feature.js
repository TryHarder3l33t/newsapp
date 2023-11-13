import React from 'react';
import { useSelector } from 'react-redux';
import { selectUsersById } from '../../store/user.store/user.slice';
import { Link } from 'react-router-dom';

export const UserFeature = ({ userId }) => {
  const user = useSelector((state) => selectUsersById(state, userId));
  return (
    <div>
      <Link to={`/user/${user.id}`}>
        <h2>{`Hello ${user.firstName} ${user.lastName}`}</h2>
      </Link>
    </div>
  );
};
