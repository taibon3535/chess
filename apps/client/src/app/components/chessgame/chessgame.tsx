import React, { useContext, useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Move, Square } from 'chess.js';
import { useAppDispatch, useAppSelector } from '../../store';
import { handleMove } from '../../../../src/utils/handle-move';
import { handleCheck } from '../../../../src/utils/handle-check';
import { handleCheckmate } from '../../../../src/utils/handle-checkmate';
import { getPieceLocations } from '../../../../src/utils/get-pieces-locations';
import { WebsocketContext } from '../../../../src/app/context/WebsocketContext';

type Props = { roomId: string };

export const ChessGame: React.FC<Props> = () => {
  const socket = useContext(WebsocketContext);
  const game = useAppSelector((state) => state.game.game);
  const fen = useAppSelector((state) => state.game.fen);
  const isCheck = useAppSelector((state) => state.game.isCheck);
  const room = useAppSelector((state) => state.game.room);
  const dispatch = useAppDispatch();
  const [check, setCheck] = useState<Square>();

  useEffect(() => {
    const checkPos =
      isCheck === true
        ? getPieceLocations(game, { color: 'b', type: 'k' })
        : null;

    if (checkPos && checkPos[0]) {
      setCheck(checkPos[0].square);
    }
  }, [isCheck]);

  useEffect(() => {
    socket.on('newMove', (body: { room: string; result: Move }) => {
      const { to, from } = body.result;
      handleMove(
        game,
        dispatch,
        {
          sourceSquare: from,
          targetSquare: to,
        },
        room,
      );
      handleCheck(game, dispatch);
      handleCheckmate(game);
    });
  }, [game]);

  return (
    <div className="flex items-center justify-center">
      <Chessboard
        position={fen}
        onDrop={({ sourceSquare, targetSquare }) => {
          handleMove(game, dispatch, { sourceSquare, targetSquare }, room);
          handleCheck(game, dispatch);
          handleCheckmate(game);
        }}
        squareStyles={
          isCheck === true && check
            ? {
                [check]: {
                  border: 3,
                  borderStyle: 'solid',
                  borderColor: 'red',
                },
              }
            : {}
        }
      />
    </div>
  );
};
