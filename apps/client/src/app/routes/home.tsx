import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store';
import { setColor, setRoom } from '../store/slices';

import Switch from '@mui/material/Switch';

export const Home: React.FC = () => {
  const [roomId, setRoomId] = useState<string>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const color = useAppSelector((state) => state.game.color);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setColor(event.target.checked ? 'b' : 'w'));
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <label>RoomID</label>
      <input
        type="text"
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
      />
      <div className="flex">
        <span>White</span>
        <Switch
          checked={color === 'w' ? false : true}
          onChange={handleChange}
        />
        <span>Black</span>
      </div>
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
