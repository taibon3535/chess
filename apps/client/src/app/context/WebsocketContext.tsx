import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

export const socket: Socket = io(
  `http://${import.meta.env.VITE_SERVER_HOSTNAME}:${import.meta.env.VITE_SERVER_PORT}`,
);
export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;
