import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { User } from './pages/user/user.component.js';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'user',
    element: <User />,
  },
]);
