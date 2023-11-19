import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import store from './store/store.index.js';
import { Provider } from 'react-redux';
import { readUsers } from './store/users.slice.js';
/**
 * Uses the div that has the div id root in the public index.html file
 * This is the react root and the root renders the routeprovides where the router will handle
 * what the react application components
 */
//store.dispatch(readUsers());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
