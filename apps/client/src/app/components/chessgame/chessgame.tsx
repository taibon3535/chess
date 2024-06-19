import React, { useContext, useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Move, Square } from 'chess.js';
import { useAppDispatch, useAppSelector } from '../../store';
import { handleMove } from '../../../../src/utils/handle-move';
import { handleCheck } from '../../../../src/utils/handle-check';
import { handleCheckmate } from '../../../../src/utils/handle-checkmate';
import { getPieceLocations } from '../../../../src/utils/get-pieces-locations';
import { WebsocketContext } from '../../../../src/app/context/WebsocketContext';
import { setFen, setTurn } from '../../store/slices';
import { useParams } from 'react-router-dom';

type Props = { roomId: string };

export const ChessGame: React.FC<Props> = () => {
  const socket = useContext(WebsocketContext);
  const game = useAppSelector((state) => state.game.game);
  const fen = useAppSelector((state) => state.game.fen);
  const isCheck = useAppSelector((state) => state.game.isCheck);
  const room = useAppSelector((state) => state.game.room);
  const dispatch = useAppDispatch();
  const [check, setCheck] = useState<Square>();
  const params = useParams();
  const turn = useAppSelector((state) => state.game.turn);
  const color = useAppSelector((state) => state.game.color);
  const side = color === 'w' ? 'white' : 'black';

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
    socket.on('newMove', (body: { fen: string }) => {
      game.load(body.fen);
      dispatch(setTurn(game.turn()));
      dispatch(setFen(body.fen));
      handleCheck(game, dispatch);
      handleCheckmate(game);
    });
  }, [game, fen]);

  useEffect(() => {
    socket.emit('joinRoom', { roomId: params.roomId });
  }, []);

  return (
    <div className="flex items-center justify-center">
      <Chessboard
        orientation={side}
        position={fen}
        onDrop={({ sourceSquare, targetSquare }) => {
          if (color === turn) {
            handleMove(game, dispatch, { sourceSquare, targetSquare }, room);
          }
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
