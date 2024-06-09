// Import React from 'react'
import React, { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from '../context/WebsocketContext';

interface StyledButtonProps {
  label: string;
  // Define onClick as a function that returns void
}

type MessagePayload = {
  content: string;
  msg: string;
};

export const StyledButton: React.FC<StyledButtonProps> = ({ label }) => {
  const socket = useContext(WebsocketContext);
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<MessagePayload[]>([]);

  useEffect(() => {
    socket.on('connect', () => {});

    socket.on('onMessage', (data: MessagePayload) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on('onMove', (data: MessagePayload) => {});

    return () => {
      console.log('disconnecting');
      socket.off('connect');
      socket.off('onMessage');
    };
  }, []);

  const onSubmit = () => {
    socket.emit('newMessage', value);
    setValue('');
  };

  return (
    <div>
      <div>
        <h1>chat</h1>

        <div>
          {messages.length === 0 ? (
            <div>no messages</div>
          ) : (
            <div>
              {messages.map((msg) => (
                <div>
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={onSubmit}>submit</button>
        </div>
      </div>
    </div>
  );
};
