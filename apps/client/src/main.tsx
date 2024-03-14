import { StrictMode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';

import { Root } from './app/routes/root';
import { Gameon } from './app/routes/online';
import { Gameoff } from './app/routes/offline';
import { store } from '../src/app/store/store';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/gameoff',
        element: <Gameoff />,
      },
      {
        path: '/gameon',
        element: <Gameon />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
