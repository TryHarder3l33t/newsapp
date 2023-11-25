import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { UsersPage } from './pages/user/users.page.js';
import { UserPage } from './pages/user/user.page.js';
import { UserCreatePage } from './pages/user/user.create.page.js';
import { UserUpdatePage } from './pages/user/user.update.page.js';
import { CreatePostPage } from './pages/posts/post.create.js';
import { ForgotPasswordPage } from './pages/user/user.forgot.password.page.js';
import { UserPasswordResetPage } from './pages/user/user.password.reset.js';

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
  {
    path: 'postcreate',
    element: <CreatePostPage />,
  },
  {
    path: 'forgotpassword',
    element: <ForgotPasswordPage />,
  },
  {
    path: 'password-reset/:token/:email',
    element: <UserPasswordResetPage />,
  },
]);
