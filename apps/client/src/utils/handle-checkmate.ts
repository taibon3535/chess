import { Chess } from 'chess.js';
import { toast } from 'react-toastify';

export const handleCheckmate = (game: Chess) => {
  if (game.isCheckmate()) {
    const turn = game.turn();
    toast.error(`Checkmate, ${turn === 'b' ? 'White' : 'Black'} wins! `, {
      position: 'bottom-left',
    });
  }

  //   TODO: handle game over
};
