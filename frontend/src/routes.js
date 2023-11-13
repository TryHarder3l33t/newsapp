import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { UsersPage } from './pages/user/users.page.js';
import { UserPage } from './pages/user/user.page.js';
import { UserCreatePage } from './pages/user/user.create.page.js';
import { UserUpdatePage } from './pages/user/user.update.page.js';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'users',
    element: <UsersPage />,
  },
  {
    path: 'user/:userId',
    element: <UserPage />,
  },
  {
    path: 'signup',
    element: <UserCreatePage />,
  },
  {
    path: 'profile/:userId',
    element: <UserUpdatePage />,
  },
]);
