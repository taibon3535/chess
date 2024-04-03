import { ChessGame } from '../components/chessgame/chessgame';
import { useAppSelector } from '../store';

export const Gameon = () => {
  const turn = useAppSelector((state) => state.game.turn);

  return (
    <div>
      {turn === 'w' ? `White's turn` : `Black's turn`}
      <ChessGame />
    </div>
  );
};
