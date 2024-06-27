import { StrictMode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';

import { socket, WebsocketProvider } from './app/context/WebsocketContext';
import { Root } from './app/routes/root';
import { Gameon } from './app/routes/online';
import { Gameoff } from './app/routes/offline';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Home } from './app/routes/home';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: '/gameoff',
        element: <Gameoff />,
      },
      {
        path: '/gameon/:roomId',
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
    <WebsocketProvider value={socket}>
      <Provider store={store}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <SignedIn>
            <RouterProvider router={router} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </ClerkProvider>
      </Provider>
    </WebsocketProvider>

    <ToastContainer />
  </StrictMode>,
);
