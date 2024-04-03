import { Chess } from 'chess.js';
import { toast } from 'react-toastify';

export const handleCheck = (game: Chess) => {
  if (game.isCheck() && !game.isCheckmate()) {
    toast.warn(`Your in Check, protect your king!`, {
      position: 'bottom-left',
    });
  }
};
