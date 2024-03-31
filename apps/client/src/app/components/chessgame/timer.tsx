import React, { useState, useEffect } from 'react';

interface TimerProps {
  turn: string;
  type: string;
  gameActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ turn, type, gameActive }) => {
  const [time, setTime] = useState<number>(10 * 60); // Set initial time here
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Handle countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && gameActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, gameActive]);

  // Synchronize timer with game state and turn
  useEffect(() => {
    if (!gameActive) {
      setIsTimerRunning(false); // Game over, stop timer
    } else {
      // Check if it's this timer's turn
      if (turn === type) {
        if (!isTimerRunning) setIsTimerRunning(true);
      } else {
        setIsTimerRunning(false);
      }
    }
  }, [turn, gameActive, type, isTimerRunning]);

  // Optionally reset timer on certain game events outside of this effect

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="timerContainer">
      <div className="timerDisplay">{formatTime(time)}</div>
    </div>
  );
};

export default Timer;
