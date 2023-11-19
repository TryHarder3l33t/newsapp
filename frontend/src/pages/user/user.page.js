import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readUser, setReadUserStatusIdle } from '../../store/users.slice';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const UserPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.users.readUserStatus);
  const userError = useSelector((state) => state.users.readUserError);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(readUser(params.userId));
    }
  }, []);

  const user = useSelector((state) => state.users.user);

  const navigateToProfile = () => {
    navigate(`/profile/${user.id}`);
  };

  if (userStatus === 'idle') {
    return <h1>Requesting</h1>;
  } else if (userStatus === 'loading') {
    return <h1>Loading</h1>;
  } else if (userStatus === 'succeeded') {
    return (
      <div>
        <h2>{`Name: ${user.firstName || 'No Name'} ${
          user.lastName || 'No Last'
        }`}</h2>
        <h2>{`Email: ${user.email || 'No Email'}`}</h2>
        <Link onClick={() => navigateToProfile()}>
          <button type='button'>PROFILE</button>
        </Link>
      </div>
    );
  } else if (userStatus === 'error') {
    return <h3>{userError}</h3>;
  }
};
