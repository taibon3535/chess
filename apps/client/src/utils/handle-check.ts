import { Chess } from 'chess.js';
import { toast } from 'react-toastify';
import { AppDispatch } from '../app/store';
import { setIsCheck } from '../app/store/slices';

export const handleCheck = (game: Chess, dispatch: AppDispatch) => {
  if (game.isCheck() && !game.isCheckmate()) {
    dispatch(setIsCheck(game.isCheck()));
    toast.warn(`Your in Check, protect your king!`, {
      position: 'bottom-left',
      toastId: 'check',
    });
  }
};
