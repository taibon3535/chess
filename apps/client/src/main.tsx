import { StrictMode } from 'react';
import { Router, RouterProvider, createBrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';

import { Root } from './app/routes/root';
import { Gameon } from './app/routes/online';
import { Gameoff } from './app/routes/offline';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/gameoff',
        element: <Gameoff/>,
      },
      {
        path: '/gameon',
        element: <Gameon />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
