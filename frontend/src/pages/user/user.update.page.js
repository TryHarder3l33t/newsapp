import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readUser } from '../../store/user.store/user.slice';
import { useParams } from 'react-router-dom';

export const UserUpdatePage = ({ match }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const readUserStatus = useSelector((state) => state.users.readUserStatus);
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(readUser(params.userId));
  }, []);
  if (readUserStatus === 'loading') {
    return <div>LOADING...</div>;
  } else if (readUserStatus === 'succeeded') {
    return (
      <section>
        <h2>PROFILE</h2>
        <form>
          <label htmlFor='firstName'>
            {' '}
            {user.firstName || 'Who Did It And Ran'}
          </label>
        </form>
      </section>
    );
  }
};
