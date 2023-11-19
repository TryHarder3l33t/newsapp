import { useDispatch, useSelector } from 'react-redux';
import {
  readUsers,
  selectAllUsers,
  selectUsersById,
  selectUsersIds,
} from '../../store/users.slice.js';
import { useEffect } from 'react';
import { UserFeature } from '../../features/user/user.feature.js';

export const UsersPage = () => {
  const dispatch = useDispatch();
  const readUsersStatus = useSelector((state) => state.users.readUsersStatus);
  useEffect(() => {
    if (readUsersStatus === 'idle') {
      dispatch(readUsers());
    }
  }, []);

  const userIds = useSelector((state) => selectUsersIds(state));

  const renderedUsers = userIds.map((id) => (
    <li key={id}>
      <UserFeature userId={id} />
    </li>
  ));

  return <ul>{renderedUsers}</ul>;
};
