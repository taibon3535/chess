import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const [roomId, setRoomId] = useState<string>();
  const navigate = useNavigate();
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
          navigate(`/gameon/${roomId}`);
        }}
      >
        Join Room
      </button>
    </div>
  );
};
