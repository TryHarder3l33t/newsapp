import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUsersById,
  setReadUserStatusIdle,
} from '../../store/users.slice.js';
import { Link, useNavigate } from 'react-router-dom';

// Do you see
export const UserFeature = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToProfile = () => {
    dispatch(setReadUserStatusIdle());
    navigate(`/user/${userId}`);
  };

  const user = useSelector((state) => selectUsersById(state, userId));

  return (
    <div>
      <Link onClick={() => navigateToProfile()}>
        <h2>{`Hello ${user.firstName} ${user.lastName}`}</h2>
      </Link>
    </div>
  );
};
