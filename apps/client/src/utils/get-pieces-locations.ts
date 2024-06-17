import { Chess, Piece } from 'chess.js';

export const getPieceLocations = (game: Chess, piece: Piece) => {
  const board = game.board();
  return board
    .filter((row) => {
      const columns = row.filter((column) => {
        if (!column) {
          return false;
        }

        if (
          column.color.toLocaleLowerCase() ===
            piece.color.toLocaleLowerCase() &&
          column.type.toLocaleLowerCase() === piece.type.toLocaleLowerCase()
        )
          return true;
      });

      if (columns.length === 0) {
        return false;
      }
      return true;
    })
    .reduce((acc, curr) => acc.concat(curr))
    .filter(
      (item) =>
        item?.color.toLocaleLowerCase() === piece.color.toLocaleLowerCase() &&
        item?.type.toLocaleLowerCase() === piece.type.toLocaleLowerCase(),
    );
};
