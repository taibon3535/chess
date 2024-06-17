import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../context/WebsocketContext';

import { useAppDispatch } from '../store';
import { setRoom } from '../store/slices';

export const Home: React.FC = () => {
  const [roomId, setRoomId] = useState<string>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <label>RoomID</label>
      <input
        type="text"
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
      />
      <button
        onClick={() => {
          if (!roomId) {
            throw new Error("roomId musn't be undefined or null");
          }
          dispatch(setRoom(roomId));
          navigate(`/gameon/${roomId}`);
        }}
      >
        Join Room
      </button>
    </div>
  );
};
