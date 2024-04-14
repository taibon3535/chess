import { useParams } from 'react-router-dom';
import { ChessGame } from '../components/chessgame/chessgame';
import { useAppSelector } from '../store';

export const Gameon = () => {
  const turn = useAppSelector((state) => state.game.turn);
  const { roomId } = useParams();
  if (!roomId) {
    throw new Error('no roomId');
  }
  return (
    <div>
      {turn === 'w' ? `White's turn` : `Black's turn`}
      <ChessGame roomId={roomId} />
    </div>
  );
};
