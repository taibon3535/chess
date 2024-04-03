import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess, Square } from 'chess.js';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store';
import { handleMove } from '../../../../src/utils/handle-move';
import { handleCheck } from '../../../../src/utils/handle-check';
import { handleCheckmate } from '../../../../src/utils/handle-checkmate';
import { getPieceLocations } from '../../../../src/utils/get-pieces-locations';

interface ChessGameState {
  fen: string;
}

interface ChessGameProps {}

class ChessGameDep extends React.Component<ChessGameProps, ChessGameState> {
  private game = new Chess();

  constructor(props: ChessGameProps) {
    super(props);
    this.state = {
      fen: 'start',
    };
  }

  handleMove = (move: {
    sourceSquare: string;
    targetSquare: string;
    piece: string;
  }) => {
    try {
      const result = this.game.move({
        from: move.sourceSquare,
        to: move.targetSquare,
        promotion: 'q',
      });

      if (result !== null) {
        this.setState({ fen: this.game.fen() });
      } else {
        console.error('Move was not successful.');
      }
    } catch (error) {
      console.error('An error occurred during the move:', error);
    }
  };

  handleCheck() {
    // Is check
    if (this.game.isCheck() && !this.game.isCheckmate()) {
      toast.warn(`Your in Chack, protect your king!`, {
        position: 'bottom-left',
      }); // Notify check
    }

    // is Checkmate
    if (this.game.isCheckmate()) {
      const turn = this.game.turn();
      toast.error(`Checkmate, ${turn === 'b' ? 'White' : 'Black'} wins! `, {
        position: 'bottom-left',
      });
    }

    if (this.game.isDraw()) {
      const msg = this.game.isInsufficientMaterial();
      toast.success(
        `Draw ${
          msg
            ? 'by insufficient material, Good Game!'
            : 'by the 50 move rule, Good Game!'
        }`,
        { position: 'bottom-left' },
      );
    }

    if (
      this.game.isGameOver() &&
      !this.game.isDraw() &&
      !this.game.isCheckmate()
    ) {
      const msg = this.game.isStalemate();
      toast.success(
        `Draw ${msg ? 'by stalemate, Good Game!' : 'by agreement, Good Game!'}`,
        { position: 'bottom-left' },
      );
    }

    if (this.game.isGameOver()) {
      toast.info(`reseting is 5 seconds, GG!`, {
        position: 'bottom-right',
        autoClose: 4500,
      });
      setTimeout(() => {
        this.game.reset();
        this.setState({ fen: this.game.fen() }); // Update state to the initial FEN string after reset
      }, 4500);
    }
  }

  render() {
    return (
      <div
        className="flex items-center justify-center"
        style={{ paddingTop: '2rem' }}
      >
        <Chessboard
          position={this.state.fen}
          onDrop={({ sourceSquare, targetSquare, piece }) => {
            this.handleMove({ sourceSquare, targetSquare, piece }); // Process move
            this.handleCheck();
          }}
        />
      </div>
    );
  }
}

export default ChessGameDep;

export const ChessGame = () => {
  const game = useAppSelector((state) => state.game.game);
  const fen = useAppSelector((state) => state.game.fen);
  const isCheck = useAppSelector((state) => state.game.isCheck);
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

  return (
    <div className="flex items-center justify-center">
      <Chessboard
        position={fen}
        onDrop={({ sourceSquare, targetSquare }) => {
          handleMove(game, dispatch, { sourceSquare, targetSquare });
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
