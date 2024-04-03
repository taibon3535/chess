import { Chess } from 'chess.js';
import { AppDispatch } from '../app/store';
import { setFen, setTurn } from '../app/store/slices';

export const handleMove = (
  game: Chess,
  dispatch: AppDispatch,
  {
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: string;
    targetSquare: string;
  },
) => {
  try {
    const result = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (result === null) {
      throw new Error('Move was not successful');
    }

    dispatch(setFen(game.fen()));
    dispatch(setTurn(game.turn()));
  } catch (e: unknown) {
    console.error('An error occurred during the move:', e);
  }
};
