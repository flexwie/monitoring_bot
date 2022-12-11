import 'core-js/features/array/flat-map';
import 'core-js/features/map';
import 'core-js/features/promise';
import 'core-js/features/set';
import 'raf/polyfill';
import 'whatwg-fetch';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Cb } from './routes/cb';
import { ErrorPage } from './error-page';
import { Telegram } from './routes/tg';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/cb',
    element: <Cb />,
  },
  {
    path: '/tg',
    element: <Telegram />,
  },
]);

const container = document.getElementById('app-root')!;

ReactDOM.render(
  <React.StrictMode>
    <main>
      <div className="flex justify-center items-center mt-8">
        <RouterProvider router={router} />
      </div>
    </main>
  </React.StrictMode>,
  container,
);
